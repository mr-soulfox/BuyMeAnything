import User from '../../schemas/user'

export async function findUser(email: string) {
	const user = await User.findOne({
		email: email,
	})

	return {
		status: user != null,
		data: user,
	}
}
