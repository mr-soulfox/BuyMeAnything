import User from '../../schemas/user'

interface UpdateParams {
	search: {
		email?: string
		userAt?: string
	}
	data: {
		email?: string
		username?: string
		userAt?: string
		salt?: string
		socialLogin?: {
			social?: string
			code?: string
		}
	}
}

export async function updateUser(params: UpdateParams) {
	await User.updateOne({...params.search}, {...params.data})

	const user = await User.findOne({email: params.data.email})

	return {
		status: true,
		data: user,
	}
}
