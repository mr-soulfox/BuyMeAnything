import {transporter} from './cfg'
import handlebars from 'handlebars'
import fs from 'fs'

interface SendMailParams {
	type: string
	to?: string
	subject?: string
	path?: string
	variables?: {
		email?: string
		link?: string
	}
}

export async function sendMailService(params: SendMailParams) {
	const templateFileContent = fs.readFileSync(String(params.path), 'utf8')
	const mailTemplateParse = handlebars.compile(templateFileContent)
	const html = mailTemplateParse(params.variables)

	const message = await transporter.sendMail({
		to: params.to,
		subject: params.subject,
		html: html,
		from: 'Buy Me Anything <noreplay@bma.com>',
	})

	return message
}
