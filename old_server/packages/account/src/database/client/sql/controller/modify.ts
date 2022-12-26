import {Modify} from '..'
import {PrismaClient} from '@prisma/client'

export interface ModifyFn extends Modify {
	prisma: PrismaClient
	newEmail?: string
}

export async function modify(props: ModifyFn, onlyData: Modify) {
	await props.prisma.user.update({
		where: {
			email: props.email,
		},
		data: {
			...onlyData,
			email: props.newEmail || props.email,
		},
	})

	const data = await props.prisma.user.findUnique({
		where: {
			email: props.newEmail || props.email,
		},
	})

	const response = {
		status: data != null,
		data: data,
	}

	return response
}
