import axios from 'axios'

export interface ForgotPasswordParams {
	email: string
	verified: boolean
	code?: string
	password?: string
}

export async function forgotPassword(params: ForgotPasswordParams) {
	const url = `${import.meta.env.VITE_API_URL}/account/forgot-password`

	const response = await axios.post(url, params)
	console.log(response)

	return response
}
