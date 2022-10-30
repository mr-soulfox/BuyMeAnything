import {Email, emailInstance, EmailParams} from '../../utils/mail'
import {PostgresClient} from '../../database/client/sql'

interface VerifyParams {
	verify: boolean
	to: string
	code: string
}

interface VerifyResponseParams {
	verified?: boolean
	status?: boolean
	value?: string | null
	complete?: boolean
	error?: number
	msg?: string
}

export async function verifyMail(params: VerifyParams): Promise<VerifyResponseParams> {
	const pgClient = new PostgresClient()
	const exist = await pgClient.exist(params.to)

	if (exist) {
		return {
			status: false,
			verified: true,
			msg: 'Email exist',
		}
	}

	if (params.verify) {
		try {
			const emailParams: EmailParams = {
				type: 'email',
				to: params.to,
				subject: 'Verify email',
			}

			const email = new Email(emailParams)
			await email.sendMail()
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

	const verifyParams = {
		key: params.code,
		mail: params.to,
	}

	const result = await emailInstance.verifyCode(verifyParams)
	return result
}
