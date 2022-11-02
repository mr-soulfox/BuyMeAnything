import {PrismaClient} from '@prisma/client'
import {create as createFn} from './controller/create'
import {modify as modifyFn} from './controller/modify'
import {verifyExist} from './controller/verifyExist'

export interface Create {
	email: string
	password: string
	salt: string
}

export interface Modify {
	email: string
	password?: string
	username?: string
	userAt?: string
	salt?: string
	social?: {
		social?: string
		code?: string
	}
}

export class PostgresClient {
	public prisma: PrismaClient = new PrismaClient()

	public async disconnect() {
		await this.prisma.$disconnect()
	}

	public async create(props: Create) {
		const fnProps = {
			...props,
			user: {
				username: props.email.split('@')[0],
				userAt: props.email.split('@')[0].replace('.', '-'),
			},
			prisma: this.prisma,
		}

		return await createFn(fnProps)
	}

	public async exist(email: string) {
		const existThisUser = await this.prisma.user.findUnique({
			where: {
				email: email,
			},
		})

		return existThisUser === null
	}

	public async modify(props: Modify, newEmail?: string) {
		const verifyProps = {
			newEmail: newEmail,
			userAt: props.userAt || '',
		}
		const exist = await verifyExist(this.prisma, verifyProps)

		if (!exist) {
			const fnProps = {
				...props,
				newEmail: newEmail,
				prisma: this.prisma,
			}

			return await modifyFn(fnProps, props)
		}

		return {
			status: exist,
			msg: 'Data exist in database',
		}
	}

	public async delete(email: string) {
		await this.prisma.user.delete({
			where: {
				email: email,
			},
		})

		return this.exist(email)
	}
}
