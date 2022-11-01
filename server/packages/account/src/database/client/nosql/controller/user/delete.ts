import User from '../../schemas/user'

export async function deleteUser(email: string) {
	await User.deleteOne({email: email})
	const deleted = await User.findOne({email: email})

	return deleted == null
}
