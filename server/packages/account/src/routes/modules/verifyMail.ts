import {Email, emailInstance, EmailParams} from 'src/utils/mail'

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
		key: params.to,
		code: params.code,
	}

	const result = await emailInstance.verifyCode(verifyParams)
	return result
}
