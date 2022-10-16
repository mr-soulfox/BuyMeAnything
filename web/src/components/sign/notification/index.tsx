import './style/index.scss'

interface notificationProps {
	status: boolean
	icon: string
}

export function Notification(props: notificationProps) {
	return (
		<div className='notification-container'>
			<img src={props.icon} alt='notification icon' className='notification-icon' />
			<span className='notification-text'>
				{props.status
					? 'Verification link sended to your mail'
					: 'Internal error. Try later, please.'}
			</span>
		</div>
	)
}
