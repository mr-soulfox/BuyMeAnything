import dotenv from 'dotenv'

dotenv.config()

export default {
	host: 'smtp.gmail.com',
	port: 587,
	user: process.env.MAIL_USER,
	pass: process.env.MAIL_PASSWORD,
}
