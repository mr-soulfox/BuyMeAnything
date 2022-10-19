import {useNavigate} from 'react-router-dom'
import noMatchIllustration from '../../assets/404.svg'
import './style/index.scss'

export function NoMatch() {
	const navigate = useNavigate()

	return (
		<>
			<header>
				<div
					className='header-content-container'
					onClick={() => {
						navigate('/', {
							replace: true,
						})
					}}
				>
					<img src='/favicon.svg' alt='Logo' className='header-content-icon' />
					<span className='header-content-text'>Buy Me Anything</span>
				</div>
			</header>

			<main>
				<div className='main-content-container'>
					<div className='no-match-description-container'>
						<span className='no-match-description-title'>oo</span>
						<span className='no-match-description-text'>
							We can't find the page that you're looking for :(
						</span>
					</div>

					<div className='no-match-illustration-container'>
						<img
							src={noMatchIllustration}
							alt='404'
							className='no-match-illustration'
						/>
					</div>

					<button
						className='no-match-back-button'
						onClick={() => {
							navigate('/', {
								replace: true,
							})
						}}
					>
						back to home
					</button>
				</div>
			</main>
		</>
	)
}
