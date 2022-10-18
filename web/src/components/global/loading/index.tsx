import {Player, Controls} from '@lottiefiles/react-lottie-player'
import loading from '../../../assets/animation/form-loading.json'

export function Loading() {
	return (
		<>
			<Player
				autoplay
				loop
				background='transparent'
				src={loading}
				style={{height: '300px', width: '300px'}}
			>
				<Controls visible={false} />
			</Player>
		</>
	)
}
