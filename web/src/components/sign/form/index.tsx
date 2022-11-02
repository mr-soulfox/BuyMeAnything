import email from '../../../assets/email.svg'
import password from '../../../assets/password.svg'
import {Inputs} from '../inputs'
import {InputCheckbox} from '../inputs/checkbox'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {Social} from '../social'
import {useDispatch} from 'react-redux'
import {setCreate, setValue} from '../../../store/slice/inputSlice'
import {Loading} from '../../global/loading'
import {verifyMail, VerifyMailParams} from '../../../utils/sign/verifyMail'
import {store} from '../../../store'
import {ButtonLoading} from '../../global/loading/buttonLoading'
import {useQuery} from '../../../hooks/useQuery'
import {toast, Toaster} from 'react-hot-toast'
import {codeProcess} from '../../../utils/sign/codeProcess'
import btnLoading from '../../../assets/animation/button-loading.json'
import './style/index.scss'

export function Form(props: {typeOfSign: string | undefined}) {
	const navigate = useNavigate()
	const query = useQuery()
	const [loading, setLoading] = useState(true)
	const [request, setRequest] = useState(false)
	const dispatch = useDispatch()

	const verifyCode = async () => {
		const code = query.get('confirmCode')

		if (code == null) {
			return
		}

		const params: VerifyMailParams = {
			code: String(code),
			verify: false,
			email: String(localStorage.getItem('form-e-mail')),
		}

		const response = await verifyMail(params)

		if (response.data.verified && response.data.status) {
			return true
		}
		return false
	}

	useEffect(() => {
		verifyCode().then((value) => {
			if (value) {
				codeProcess(value)
				navigate('/account/@NewUser')
			}
		})

		dispatch(setCreate(props.typeOfSign === 'up' ? true : false))

		dispatch(
			setValue(
				JSON.stringify({
					typeInput: 'e-mail',
					value: sessionStorage.getItem('form-e-mail') || '',
				})
			)
		)

		dispatch(
			setValue(
				JSON.stringify({
					typeInput: 'password',
					value: sessionStorage.getItem('form-password') || '',
				})
			)
		)

		setLoading(false)
	}, [])

	return (
		<div className='sign-form-container'>
			<Toaster position='top-right' reverseOrder={false} />
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
								onClick={async (ev) => {
									if (props.typeOfSign === 'up') {
										setRequest(true)
										const params: VerifyMailParams = {
											verify: true,
											email: store.getState().input.email,
										}

										await verifyMail(params)
										toast.success(
											`Code sended to ${store.getState().input.email}`,
											{
												icon: '✉️',
												style: {
													padding: '5px',
													fontWeight: 'bold',
													border: '1px solid #A27B5C',
													color: '#A27B5C',
												},
												iconTheme: {
													primary: '#a27b5c',
													secondary: '#e1e1e6',
												},
											}
										)

										localStorage.setItem(
											'cache-email',
											store.getState().input.email
										)
										localStorage.setItem(
											'cache-password',
											store.getState().input.password
										)

										setRequest(false)
									}
								}}
							>
								{request ? (
									<Loading src={btnLoading} measure='35px' />
								) : (
									`Sign ${props.typeOfSign}`
								)}
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
