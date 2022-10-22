import google from '../../../assets/google.svg'
import facebook from '../../../assets/facebook.svg'
import github from '../../../assets/github.svg'
import {useEffect, useState} from 'react'
import './style/index.scss'

type SocialType = Array<JSX.Element>

export function Social() {
	const socialType: SocialType = []
	const [social, setSocial] = useState(socialType)
	const socialList = [{Google: google}, {Facebook: facebook}, {Github: github}]
	const CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID

	useEffect(() => {
		const list = socialList.map((social) => {
			const icon = Object.values(social)
			const name = Object.keys(social)

			return (
				<div
					className='social-box'
					id={name[0]}
					onClick={(ev) => {
						if (ev.currentTarget.id == 'Github') {
							window.location.assign(
								'https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID
							)

							sessionStorage.removeItem('form-e-mail')
							sessionStorage.removeItem('form-password')
							sessionStorage.removeItem('form-remember-me')
							return
						}

						alert('Please, try only with Github')
					}}
				>
					<img src={icon[0]} alt={name[0]} title={name[0]} />
				</div>
			)
		})

		setSocial(list)
	}, [])

	return (
		<div className='social-container'>
			<div className='social-separator-container'>
				<p className='social-middle-word'>or</p>
			</div>

			<div className='social-box-container'>{social}</div>
		</div>
	)
}
