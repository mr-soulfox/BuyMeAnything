import {sendMailService} from '../../service/mail'
import {redisClient} from '../../database/cache/redis'
import randomstring from 'randomstring'
import {resolve} from 'path'

export interface EmailParams {
	type: string
	to: string
	subject: string
}

export class Email {
	private mail?: {
		to: string
		subject: string
		variables: {
			email: string
			link: string
		}
	}
	private type?: string
	private code?: string

	constructor(params?: EmailParams) {
		this.mail = {
			to: String(params?.to),
			subject: String(params?.subject),
			variables: {
				email: String(params?.to),
				link: this.generateLink(),
			},
		}

		this.type = String(params?.type)
	}

	public generateLink(change?: boolean): string {
		if (change) {
			this.code = randomstring.generate({
				length: 4,
				charset: 'numeric',
			})

			return ''
		}

		const link = String(process.env.WEB_URL)
		this.code = randomstring.generate({
			length: 7,
			charset: 'alphanumeric',
		})

		return `${link}${this.code}`
	}

	public async sendMail(change?: boolean) {
		await sendMailService({
			...this.mail,
			type: String(this.type),
			path: resolve(
				__dirname,
				'..',
				'..',
				'service',
				'mail',
				'html',
				`${!change ? 'create' : 'changeMail'}`,
				'index.hbs'
			),
			variables: {
				code: this.code,
			},
		})

		redisClient.setValue({
			key: String(this.code),
			value: String(this.mail?.to),
			exp: 1,
		})
	}

	public async verifyCode(params: {key: string; mail: string}) {
		const result = await redisClient.getValue(params.key)

		return {
			...result,
			verified: params.mail === result.value,
		}
	}
}

export const emailInstance = new Email()
