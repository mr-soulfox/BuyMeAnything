import {BackButton} from '../global/backButton'
import {Notification} from './notification'

interface signProps {
	notify: boolean
	childProps: any
}

export function SignComponent(props: signProps) {
	return (
		<>
			<BackButton />
			{props.notify && (
				<Notification status={props.childProps.status} icon={props.childProps.icon} />
			)}
		</>
	)
}
