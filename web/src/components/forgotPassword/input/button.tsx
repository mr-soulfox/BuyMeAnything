import {useDispatch} from 'react-redux'
import {setReset} from '../../../store/slice/inputSlice'
import './style/button.scss'

export function ButtonInputBox() {
	const dispatch = useDispatch()

	return (
		<>
			<button
				className='reset-form-button'
				onClick={() => {
					sessionStorage.removeItem('form-e-mail')
					dispatch(setReset(true))
					alert('In Construction')
				}}
			>
				Send
			</button>
		</>
	)
}
