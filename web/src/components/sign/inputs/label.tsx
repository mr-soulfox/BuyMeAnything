export function InputLabel(props: {type: string}) {
	return (
		<label htmlFor={props.type} className='form-input-label'>
			{props.type}
		</label>
	)
}
