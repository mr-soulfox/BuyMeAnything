import './style/checkbox.scss'

export function InputCheckbox() {
	return (
		<div className='input-checkbox-container'>
			<input
				type='checkbox'
				name='rememberMe'
				id='rememberMe'
				className='input-checkbox'
			/>

			<label htmlFor='rememberMe' className='input-checkbox-label'>
				Remember me?
			</label>
		</div>
	)
}
