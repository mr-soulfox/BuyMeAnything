import {Player, Controls} from '@lottiefiles/react-lottie-player'

export function ButtonLoading(loading: any) {
	return (
		<>
			<Player
				autoplay
				loop
				background='transparent'
				src={loading}
				style={{height: '35px', width: '35px'}}
			>
				<Controls visible={false} />
			</Player>
		</>
	)
}
