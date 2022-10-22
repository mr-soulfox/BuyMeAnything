import {useNavigate} from 'react-router-dom'
import './style/index.scss'

interface ResultProps {
	confirmCode: string
	id: number
	valid: boolean
	changeValid: React.Dispatch<React.SetStateAction<boolean>>
}

export function ResultResetPassword(props: ResultProps) {
	const navigate = useNavigate()

	return (
		<button
			className='result-button'
			onClick={() => {
				navigate(props.valid ? '/sign/in' : '/forgot-password')
			}}
		>
			{props.valid ? 'go to sign-in' : 'resend code'}
		</button>
	)
}
