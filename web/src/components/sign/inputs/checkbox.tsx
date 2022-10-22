import {useDispatch} from 'react-redux'
import {useState, useEffect} from 'react'
import {toggleRememberMe} from '../../../store/slice/inputSlice'
import './style/checkbox.scss'

export function InputCheckbox() {
	const cacheCheck = sessionStorage.getItem('form-remember-me')
	const [check, setCheck] = useState(cacheCheck === 'true' ? true : false)
	const dispatch = useDispatch()

	useEffect(() => {
		sessionStorage.setItem('form-remember-me', String(check))
	}, [check])

	return (
		<div className='input-checkbox-container'>
			<input
				type='checkbox'
				name='rememberMe'
				id='rememberMe'
				className='input-checkbox'
				onChange={() => {
					dispatch(toggleRememberMe())
					setCheck(!check)
				}}
				checked={check}
			/>

			<label htmlFor='rememberMe' className='input-checkbox-label'>
				Remember me?
			</label>
		</div>
	)
}
