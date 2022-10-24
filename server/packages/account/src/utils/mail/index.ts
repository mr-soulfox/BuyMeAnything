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

	private generateLink(): string {
		const link = process.env.WEB_URL || 'http://127.0.0.1:5173/sign/up?confirmCode='
		this.code = randomstring.generate({
			length: 7,
			charset: 'alphanumeric',
		})

		return `${link}${this.code}`
	}

	public async sendMail() {
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
				'create',
				'index.hbs'
			),
		})

		redisClient.setValue({
			key: String(this.mail?.to),
			value: String(this.code),
			exp: 1,
		})
	}

	public async verifyCode(params: {key: string; code: string}) {
		const result = await redisClient.getValue(params.key)

		return {
			...result,
			verified: params.code === result.value,
		}
	}
}

export const emailInstance = new Email()
