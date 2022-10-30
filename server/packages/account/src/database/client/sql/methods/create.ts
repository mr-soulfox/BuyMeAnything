import {Create} from '..'
import {PrismaClient} from '@prisma/client'

export interface CreateProps extends Create {
	prisma: PrismaClient
	user: {
		username: string
		userAt: string
	}
}

export async function create(props: CreateProps) {
	await props.prisma.user.create({
		data: {
			email: props.email,
			password: props.password,
			username: props.user.username,
			userAt: props.user.userAt,
			salt: props.salt,
		},
	})

	const created = await props.prisma.user.findUnique({
		where: {
			email: props.email,
		},
	})

	const response = {
		status: created != null,
		data: created,
	}

	return response
}
