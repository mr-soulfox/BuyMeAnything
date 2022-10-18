import email from '../../../assets/email.svg'
import {Inputs} from '../inputs'
import password from '../../../assets/password.svg'
import {InputCheckbox} from '../inputs/checkbox'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {Social} from '../social'
import {Loading} from '../../global/loading'
import './style/index.scss'

export function Form(props: {typeOfSign: string | undefined}) {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(!loading)
		}, 1500)
	}, [])

	return (
		<div className='sign-form-container'>
			{loading && <Loading />}

			{!loading && (
				<>
					<span className='sign-form-title'>sign {props.typeOfSign}</span>
					{props.typeOfSign === 'up' && (
						<span className='sign-up-form-sub'>Welcome to platform</span>
					)}

					<div className='sign-form'>
						<Inputs
							type='e-mail'
							icon={email}
							placeholder='Your email'
							typeOfSign={props.typeOfSign}
						/>
						<Inputs
							type='password'
							icon={password}
							placeholder='************'
							typeOfSign={props.typeOfSign}
						/>
						{props.typeOfSign === 'in' && <InputCheckbox />}

						<div className='sign-button-container'>
							<button
								className='sign-button'
								onClick={(ev) => {
									window.alert('In Construction')
								}}
							>
								Sign {props.typeOfSign}
							</button>

							<span
								className='sign-up-form-already'
								onClick={() => {
									navigate(props.typeOfSign === 'up' ? '/sign/in' : '/sign/up', {
										replace: true,
									})
								}}
							>
								{props.typeOfSign === 'up'
									? 'Already user?'
									: "Don't have account?"}
							</span>
						</div>

						{props.typeOfSign === 'in' && <Social />}
					</div>
				</>
			)}
		</div>
	)
}
