import key from '../../assets/key.svg'
import {ResetForm} from '../../components/forgotPassword/form'
import {BackButton} from '../../components/global/backButton'
import './style/index.scss'

export function ForgotPassword() {
	return (
		<div className='forgot-page-container'>
			<BackButton />

			<div className='forgot-header-container'>
				<div className='forgot-key-image-container'>
					<img src={key} alt='key' className='forgot-key-image' />
				</div>

				<div className='forgot-description-container'>
					<span className='forgot-title'>Forgot your password?</span>
					<span className='forgot-description'>
						Enter your email and we will send you a reset code
					</span>
				</div>
			</div>

			<ResetForm />
		</div>
	)
}
