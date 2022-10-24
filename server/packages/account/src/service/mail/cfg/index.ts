import nodemailer from 'nodemailer'
import SMTP_CONFIG from './smtp.cfg'

export const transporter = nodemailer.createTransport({
	host: SMTP_CONFIG.host,
	port: SMTP_CONFIG.port,
	secure: false,
	auth: {
		user: SMTP_CONFIG.user,
		pass: SMTP_CONFIG.pass,
	},
	tls: {
		rejectUnauthorized: false,
	},
})
