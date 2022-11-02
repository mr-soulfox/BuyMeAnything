import {store} from '../../store'
import {
	setIdentifier,
	setAccountDetails,
	setVerified,
	saveState,
} from '../../store/slice/accountSlice'

export function codeProcess(verifiedMail: boolean) {
	const dispatch = (action: any) => {
		store.dispatch(action)
	}
	const params = {
		email: localStorage.getItem('cache-email'),
		password: localStorage.getItem('cache-password'),
		verified: verifiedMail,
	}

	dispatch(setIdentifier(String(params.email)))
	dispatch(setVerified())
	setAccountDetails({
		email: params.email,
		password: params.password,
	})

	localStorage.clear()
	sessionStorage.clear()

	dispatch(saveState())
}
