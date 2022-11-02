import {Player, Controls} from '@lottiefiles/react-lottie-player'
import loading from '../../../assets/animation/form-loading.json'

export function Loading(props: {src?: any; measure?: string}) {
	return (
		<>
			<Player
				autoplay
				loop
				background='transparent'
				src={props.src || loading}
				style={{height: props.measure || '300px', width: props.measure || '300px'}}
			>
				<Controls visible={false} />
			</Player>
		</>
	)
}
