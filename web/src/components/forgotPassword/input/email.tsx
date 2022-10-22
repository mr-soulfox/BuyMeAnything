import {useEffect, useState} from 'react'
import email from '../../../assets/email.svg'
import invalidIcon from '../../../assets/inValid.svg'
import validIcon from '../../../assets/check.svg'
import {useDispatch} from 'react-redux'
import {setValue as setReduxValue} from '../../../store/slice/inputSlice'
import {setValid as setReduxValid} from '../../../store/slice/inputSlice'
import './style/email.scss'

export function EmailInputBox() {
	const [valid, setValid] = useState(false)
	const [value, setValue] = useState('')
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setReduxValid(valid))
		const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
		if (value.match(pattern)) {
			setValid(true)
			return
		}

		setValue(sessionStorage.getItem('form-e-mail') || '')
		setValid(false)
		return
	}, [value, valid])

	return (
		<>
			<label
				htmlFor='email'
				style={{
					display: 'none',
				}}
			>
				Email
			</label>

			<div
				className='email-input-box'
				onClick={() => {
					document.getElementById('email')?.focus()
				}}
			>
				<img src={email} alt='email' className='email-input-icon' />

				<input
					type='text'
					id='email'
					className='email-input'
					placeholder='Your email'
					value={value}
					onFocus={(ev) => {
						ev.target.parentElement!.style.boxShadow =
							'0px 0px 0px 2px #7c7c7c inset'
					}}
					onBlur={(ev) => {
						ev.target.parentElement!.style.boxShadow = 'none'
					}}
					onChange={(ev) => {
						sessionStorage.setItem(`form-e-mail`, ev.target.value)
						dispatch(
							setReduxValue(
								JSON.stringify({
									type: 'e-mail',
									value: ev.target.value,
								})
							)
						)

						setValue(ev.target.value)
					}}
				/>

				<img
					src={valid ? validIcon : invalidIcon}
					alt='validate'
					className='email-input-validate-icon'
					id='icon-validator'
				/>
			</div>
		</>
	)
}
