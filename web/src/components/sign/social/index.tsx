import google from '../../../assets/google.svg'
import facebook from '../../../assets/facebook.svg'
import github from '../../../assets/github.svg'
import {useEffect, useState} from 'react'
import './style/index.scss'

type temp_socialType = Array<JSX.Element>

export function Social() {
	const abc: temp_socialType = []
	const [temp_social, setTemp_social] = useState(abc)
	const temp_socialList = ['Google', 'Facebook', 'Github']
	const temp_socialIconList = [google, facebook, github]

	useEffect(() => {
		const list = temp_socialList.map((social, i) => {
			return (
				<div className='social-box'>
					<img src={temp_socialIconList[Number(i)]} alt={social} title={social} />
				</div>
			)
		})

		setTemp_social(list)
	}, [])

	return (
		<div className='social-container'>
			<div className='social-separator-container'>
				<p className='social-middle-word'>or</p>
			</div>

			<div className='social-box-container'>{temp_social}</div>
		</div>
	)
}
