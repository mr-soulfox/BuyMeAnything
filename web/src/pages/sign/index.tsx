import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {SignComponent} from '../../components/sign'
import logoDark from '../../assets/logoDark.svg'
import successSign from '../../assets/successSign.svg'
import './style/index.scss'
import {Form} from '../../components/sign/form'

export function SignInUp() {
	const {typeOfSign} = useParams()
	const navigate = useNavigate()
	const [notify, setNotify] = useState(false)

	useEffect(() => {
		if (!(typeOfSign === 'in' || typeOfSign === 'up')) {
			navigate('/404', {replace: true})
		}
	}, [])

	return (
		<>
			<SignComponent
				notify={notify}
				childProps={{
					icon: successSign,
					status: true,
				}}
			/>

			<span
				className='need-help-link'
				onClick={() => {
					navigate('/help')
				}}
			>
				Need help?
			</span>

			<div className='sign-interface-container'>
				<div className='panel-container'>
					<div className='panel-logo-group'>
						<img src={logoDark} alt='logo' className='panel-logo' />

						<span className='panel-title'>buy me anything</span>
					</div>

					<div className='panel-description-container'>
						<span className='panel-description'>
							Free wallet to receive donate from any people, buy anything for you.
						</span>
					</div>
				</div>

				<Form typeOfSign={typeOfSign} />
			</div>
		</>
	)
}
