import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {setReset} from '../../../store/slice/inputSlice'
import {forgotPassword} from '../../../utils/forgotPassword'
import {ButtonLoading} from '../../global/loading/buttonLoading'
import './style/button.scss'

export function ButtonInputBox() {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)

	return (
		<>
			<button
				className='reset-form-button'
				onClick={() => {
					setLoading(true)
					dispatch(setReset(true))
					forgotPassword({
						email: String(sessionStorage.getItem('form-e-mail')),
						verified: false,
					})
					sessionStorage.removeItem('form-e-mail')
					setLoading(false)
				}}
			>
				{loading ? <ButtonLoading /> : <>Send</>}
			</button>
		</>
	)
}
