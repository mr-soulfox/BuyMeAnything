import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import arrow from '../../../assets/arrowLeft.svg'
import './style/index.scss'

export function BackButton() {
	const navigate = useNavigate()
	const BackButtonBG = styled.div`
		background-color: ${'#3f4e4f'};

		&:hover {
			background-color: ${'#7C7C7C'};
		}
	`

	return (
		<div className='back-button-container'>
			<BackButtonBG
				className='back-button-circle'
				onClick={() => {
					navigate('/')
				}}
			>
				<img
					src={arrow}
					alt='Come back'
					title='Come Back'
					className='back-button-arrow'
				/>
			</BackButtonBG>
		</div>
	)
}
