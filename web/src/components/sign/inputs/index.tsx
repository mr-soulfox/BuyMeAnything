import {useEffect, useState} from 'react'
import {ForgotPassword} from './forgotPassword'
import {InputBox} from './input'
import {InputLabel} from './label'
import check from '../../../assets/check.svg'
import inValid from '../../../assets/inValid.svg'
import './style/index.scss'

export interface inputProps {
	type: string
	icon: string
	placeholder: string
	typeOfSign?: string
}

export function Inputs(props: inputProps) {
	const [value, setValue] = useState('')
	const [valid, setValid] = useState(false)

	useEffect(() => {
		if (props.type === 'e-mail') {
			const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
			if (value.match(pattern)) {
				setValid(true)
				return
			}

			setValid(false)
			return
		}

		const pattern = /[^A-Za-z0-9-'']/i
		if (
			value.length >= 8 &&
			value.length <= 16 &&
			value.match(pattern) &&
			value.match(/[0-9]/i) &&
			!value.match(' ')
		) {
			setValid(true)
			return
		}

		setValid(false)
	}, [value])

	return (
		<div>
			<InputLabel type={props.type} />
			<InputBox
				type={props.type}
				icon={props.icon}
				placeholder={props.placeholder}
				changeValue={setValue}
				iconValidate={valid ? check : inValid}
				typeOfSign={props.typeOfSign}
			/>
			<ForgotPassword type={props.type} typeOfSign={props.typeOfSign} />
		</div>
	)
}
