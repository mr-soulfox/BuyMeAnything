import {client} from './cfg'
import {convertDate} from './utils/convertDate'

interface SetValuePromise {
	created: boolean
	saved: {
		key: string
		saved: string | null
	}
}

interface GetValuePromise {
	status: boolean
	value: string | null
}

interface setValue {
	key: string
	value: string
	exp: number
}

class RedisClient {
	private client: typeof client

	constructor() {
		this.client = client
		this.client.on('error', (err) => console.log('Redis Client Error', err))
		this.client.connect()
	}

	public disconnect() {
		this.client.disconnect()
	}

	public async setValue(params: setValue): Promise<SetValuePromise> {
		try {
			await this.client.set(params.key, params.value)
			await this.client.expireAt(params.key, convertDate(params.exp))
		} catch (err) {
			console.log('Set value error', err)
		}

		const exist = await client.get(params.key)

		return {
			created: exist == null,
			saved: {
				key: params.key,
				saved: exist,
			},
		}
	}

	public async getValue(key: string): Promise<GetValuePromise> {
		const value = await this.client.get(key)
		return {
			status: value != null,
			value: value,
		}
	}
}

export const redisClient = new RedisClient()
