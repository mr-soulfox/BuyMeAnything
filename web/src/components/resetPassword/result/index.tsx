interface ResultProps {
	confirmCode: string
	id: number
	valid: boolean
}

export function ResultResetPassword(props: ResultProps) {
	return (
		<div>
			{props.confirmCode}, {props.id} <br />
			{props.valid ? 'valid code' : 'invalid code'}
		</div>
	)
}
