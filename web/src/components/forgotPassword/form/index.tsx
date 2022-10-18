import {ButtonInputBox} from '../input/button'
import {EmailInputBox} from '../input/email'

export function ResetForm() {
	return (
		<div className='forgot-form-container'>
			<EmailInputBox />

			<div className='forgot-button-container'>
				<ButtonInputBox />
			</div>
		</div>
	)
}
