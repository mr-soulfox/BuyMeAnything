import User from '../../schemas/user'

interface UserParams {
	email: string
	username: string
	userAt: string
	salt: string
}

export async function createUser(params: UserParams) {
	const userExist = await User.findOne({email: params.email})

	if (userExist != null) {
		return {
			status: false,
			msg: 'User already exist in database',
		}
	}

	const user = await User.create({
		email: params.email,
		username: params.username,
		userAt: params.userAt,
		salt: params.salt,
	})

	const createdUser = await user.save()

	return {
		status: true,
		result: createdUser,
	}
}
