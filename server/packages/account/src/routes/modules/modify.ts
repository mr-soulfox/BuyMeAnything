import {Modify, PostgresClient} from '../../database/client/sql'
import crypto from 'crypto'
import {Email, emailInstance, EmailParams} from '../../utils/mail'
import {updateUser} from '../../database/client/nosql/controller/user/update'

export async function modifyAccount(
	props: Modify,
	newEmail?: string,
	verify?: string,
	code?: string
) {
	const pgClient = new PostgresClient()

	const exist = await pgClient.exist(newEmail || '')

	if (!exist) {
		return {
			exist: !exist,
			msg: 'Email exist in database',
		}
	}

	if (verify || verify === undefined) {
		if (newEmail != undefined) {
			const verifyParams = {
				key: code || '',
				mail: newEmail || '',
			}

			const result = await emailInstance.verifyCode(verifyParams)

			if (!result.verified) {
				return {
					...result,
				}
			}
		}

		if (props.password) {
			const salt = crypto.randomBytes(16).toString('hex')
			const cryptPassword = crypto
				.pbkdf2Sync(props.password, salt, 1000, 64, 'sha512')
				.toString('hex')

			props.password = cryptPassword
			props.salt = salt
		}

		const response = await pgClient.modify(props, newEmail)
		await pgClient.disconnect()

		if (response.status) {
			const result = await updateUser({
				search: {
					email: props.email,
				},
				data: {
					...props,
					email: newEmail || props.email,
				},
			})

			return {
				status: response.status == result.status,
				data: {
					database: response,
					mongoCache: result.data,
				},
			}
		}

		return response
	}

	try {
		const emailParams: EmailParams = {
			type: 'email',
			to: String(newEmail),
			subject: 'Verify email',
		}

		const email = new Email(emailParams)
		email.generateLink(true)
		await email.sendMail(true)
		return {
			complete: true,
		}
	} catch (err) {
		console.log(err)
		return {
			error: 500,
			msg: 'Internal error, try again later.',
		}
	}
}
