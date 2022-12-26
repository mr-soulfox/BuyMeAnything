import {createClient} from 'redis'

export const client = createClient({
	socket: {
		port: Number(process.env.REDIS_PORT),
		host: String(process.env.REDIS_HOST),
	},
	password: process.env.REDIS_PASSWORD,
})
