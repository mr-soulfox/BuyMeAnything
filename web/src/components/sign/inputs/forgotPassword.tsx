import {useNavigate} from 'react-router-dom'

interface forgotPasswordProps {
	type: string
	typeOfSign?: string
}

export function ForgotPassword(props: forgotPasswordProps) {
	const navigate = useNavigate()

	return (
		<div className='form-forgot-password-container'>
			{props.type === 'password' && props.typeOfSign === 'in' && (
				<span
					className='form-forgot-password'
					onClick={() => {
						navigate('/forgot-password')
					}}
				>
					forgot password?
				</span>
			)}
		</div>
	)
}
