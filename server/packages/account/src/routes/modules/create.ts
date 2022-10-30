import {PostgresClient} from '../../database/client/sql'
import crypto from 'crypto'

export async function createAccount(email: string, password: string) {
	const pgClient = new PostgresClient()
	const salt = crypto.randomBytes(16).toString('hex')
	const cryptPassword = crypto
		.pbkdf2Sync(password, salt, 1000, 64, 'sha512')
		.toString('hex')

	const props = {
		email: email,
		password: cryptPassword,
		salt: salt,
	}

	const response = await pgClient.create(props)
	await pgClient.disconnect()

	return response
}
