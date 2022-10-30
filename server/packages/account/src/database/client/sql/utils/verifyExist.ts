import {PrismaClient} from '@prisma/client'

interface VerifyExist {
	newEmail?: string
	userAt: string
}

export async function verifyExist(prisma: PrismaClient, props: VerifyExist) {
	const exist = await prisma.user.findFirst({
		where: {
			OR: {
				email: props.newEmail,
				userAt: props.userAt,
			},
		},
	})

	return exist != null
}
