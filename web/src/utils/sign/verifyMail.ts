import axios from 'axios'

export interface VerifyMailParams {
	code?: string
	verify: boolean
	email: string
}

export async function verifyMail(params: VerifyMailParams) {
	const url = `${import.meta.env.VITE_API_URL}/account/verify-mail/${params.code || '0'}`

	const response = await axios.post(url, {
		verify: params.verify,
		email: params.email,
	})

	return response
}
