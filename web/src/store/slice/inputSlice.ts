import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	email: '',
	password: '',
	create: true,
	rememberMe: false,
}

interface InputSlice {
	typeInput: string
	value: string
}

export const inputSlice = createSlice({
	name: 'input',
	initialState,
	reducers: {
		toggleRememberMe: (state) => {
			state.rememberMe = !state.rememberMe
		},
		setCreate: (state, action) => {
			state.create = action.payload
		},
		setValue: (state, action) => {
			const actObject: InputSlice = JSON.parse(action.payload)

			if (actObject.typeInput === 'password') {
				state.password = actObject.value
			} else {
				state.email = actObject.value
			}
		},
	},
})

export const {toggleRememberMe, setCreate, setValue} = inputSlice.actions
export default inputSlice.reducer
