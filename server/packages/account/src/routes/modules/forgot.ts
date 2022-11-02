import {Email, emailInstance, EmailParams} from '../../utils/mail'
import {PostgresClient} from '../../database/client/sql'

interface ForgotParams {
	email: string
	password: string
	verified: boolean
	code: string
}

interface ForgotResponse {
	verified?: boolean
	status?: boolean
	value?: string | null
	msg?: string
	redirect?: boolean
}

export async function forgotPassword(params: ForgotParams): Promise<ForgotResponse> {
	const pgClient = new PostgresClient()
	const exist = await pgClient.exist(params.email)

	if (exist) {
		return {
			status: false,
			msg: 'Email exist',
		}
	}

	if (!exist) {
		if (params.verified) {
			const verifyParams = {
				key: params.code,
				mail: params.email,
			}

			const result = await emailInstance.verifyCode(verifyParams)

			return {
				status: result.status,
				redirect: result.verified == result.status,
			}
		}

		const emailParams: EmailParams = {
			type: 'email',
			to: params.email,
			subject: 'Change password',
		}

		const email = new Email(emailParams)
		const link = email.generateLink(false, true)
		await email.sendMail(link, false, true)
	}

	return {}
}
