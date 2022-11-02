import {createSlice} from '@reduxjs/toolkit'
import {store} from '..'

const initialState = {
	username: '',
	at: '',
	email: '',
	password: '',
	create: true,
	verified: false,
}

interface AccountSlice {
	username: string
	at: string
	email: string
	password: string
	create: boolean
	verified: boolean
}

export const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		setIdentifier: (state, action) => {
			if (state.create) {
				const username = String(action.payload).split('@')[0]
				state.username = username
				state.at = username.replace('.', '-')
				return
			}

			if (action.payload.opt === 'at' && !state.create) {
				state.at = action.payload
				return
			}

			state.username = action.payload
		},
		setOperationType: (state, action) => {
			state.create = action.payload
		},
		setAccountDetails: (state, action) => {
			state.email = action.payload.email
			state.password = action.payload.password
		},
		setVerified: (state) => {
			state.verified = !state.verified
		},
		saveState: (state) => {
			const jsonState = JSON.stringify(state)
			localStorage.setItem('app_state', jsonState)
		},
		loadState: (state) => {
			const jsonState = localStorage.getItem('app_state')
			if (jsonState != null) {
				state = {
					...JSON.parse(String(jsonState)),
				}
			}
		},
	},
})

export const {
	setIdentifier,
	setOperationType,
	setAccountDetails,
	setVerified,
	saveState,
	loadState,
} = accountSlice.actions
export default accountSlice.reducer
