import {PostgresClient} from '../../database/client/sql'
import crypto from 'crypto'
import {createUser} from '../../database/client/nosql/controller/user/create'
import {findUser} from '../../database/client/nosql/controller/user/find'
import {User} from '@prisma/client'

interface CreateAccountPromise {
	status?: boolean
	exist?: boolean
	msg?: string
	data?: {
		database?: User | null
		mongoCache?: any | null
	}
}

export async function createAccount(
	email: string,
	password: string
): Promise<CreateAccountPromise> {
	const pgClient = new PostgresClient()

	const exist = await pgClient.exist(email)

	if (!exist) {
		return {
			exist: !exist,
			msg: 'Email exist in database',
		}
	}

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

	if (response.data != null) {
		const params = {
			email: email,
			username: response.data?.username || '',
			userAt: response.data?.userAt || '',
			salt: salt,
		}

		await createUser(params)
		const result = await findUser(email)

		return {
			status: response.status == result.status,
			data: {
				database: response.data,
				mongoCache: result.data,
			},
		}
	}

	return {
		status: response.status,
		data: {
			database: response.data,
		},
	}
}
