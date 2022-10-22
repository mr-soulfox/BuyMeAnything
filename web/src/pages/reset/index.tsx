import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {BackButton} from '../../components/global/backButton'
import reset from '../../assets/reset.svg'
import invalid from '../../assets/resetInvalid.svg'
import './style/index.scss'
import {ResultResetPassword} from '../../components/resetPassword/result'

export function ResetPassword() {
	const {confirmCode, id} = useParams()
	const [valid, setValid] = useState(true)

	useEffect(() => {
		if (confirmCode?.length != 7) {
			setValid(false)
		}
	}, [])

	return (
		<div className='reset-page-container'>
			<header>
				<BackButton location='/sign/in' />
			</header>

			<main>
				<div className='reset-container'>
					<header>
						<div className='reset-header-container'>
							<div className='reset-image-container'>
								<img
									src={valid ? reset : invalid}
									alt='key'
									className='reset-key-image'
								/>
							</div>

							<div className='reset-description-container'>
								<span className='reset-title'>Verifying Code</span>
								<span className='reset-description'>
									{valid
										? 'Your code is valid'
										: 'Your code is invalid! Please, tru again.'}
								</span>
							</div>
						</div>
					</header>

					<main>
						<ResultResetPassword
							confirmCode={String(confirmCode)}
							id={Number(id)}
							valid={valid}
							changeValid={setValid}
						/>
					</main>
				</div>
			</main>
		</div>
	)
}
