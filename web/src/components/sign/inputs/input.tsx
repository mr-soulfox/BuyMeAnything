import React, {useState, useEffect} from 'react'
import {inputProps} from '.'
import {useDispatch} from 'react-redux'
import {setValue} from '../../../store/slice/inputSlice'

interface inputBoxProps extends inputProps {
	changeValue: React.Dispatch<React.SetStateAction<string>>
	iconValidate: string
	validate?: boolean
}

export function InputBox(props: inputBoxProps) {
	const [validate, setValidate] = useState(props.validate || false)
	const [actualValue, setActualValue] = useState('')
	const dispatch = useDispatch()

	useEffect(() => {
		setActualValue(sessionStorage.getItem(`form-${props.type}`) || '')
	}, [])

	return (
		<div
			className='form-input-container'
			onClick={() => {
				document.getElementById(props.type)?.focus()
			}}
		>
			<img src={props.icon} alt='Input icon' className='form-input-icon' />
			<input
				type={props.type}
				name={props.type}
				id={props.type}
				className='form-input-box'
				onFocus={(ev) => {
					ev.target.parentElement!.style.boxShadow = '0px 0px 0px 2px #7c7c7c inset'

					if (props.type !== 'password') {
						return
					}

					ev.target.type = 'text'
				}}
				onBlur={(ev) => {
					ev.target.parentElement!.style.boxShadow = 'none'

					if (props.type !== 'password') {
						return
					}

					ev.target.type = 'password'
				}}
				onChange={(ev) => {
					if (ev.target.value.length > 0) {
						setValidate(true)
					} else {
						setValidate(false)
					}

					setActualValue(ev.target.value)
					sessionStorage.setItem(`form-${props.type}`, ev.target.value)

					dispatch(
						setValue(
							JSON.stringify({
								type: props.type,
								value: ev.target.value,
							})
						)
					)

					props.changeValue(ev.target.value.trim())
				}}
				placeholder={props.placeholder}
				value={actualValue}
			/>

			{props.typeOfSign === 'up' && validate && (
				<img
					src={props.iconValidate}
					alt='validate'
					className='form-input-validate-icon'
					id='icon-validator'
				/>
			)}
		</div>
	)
}
