import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {Loading} from '../../components/global/loading'
import {store} from '../../store'
import {loadState} from '../../store/slice/accountSlice'
import './style/index.scss'

export function Account() {
	const {userAt} = useParams()
	const [create, setCreate] = useState(true)
	const dispatch = useDispatch()

	useEffect(() => {
		if (userAt !== '@NewUser') {
			setCreate(false)
			return
		}

		dispatch(loadState())
		console.log(store.getState().account)
	}, [])

	return (
		<div>
			{create ? (
				<div className='create-account-loading'>
					<Loading measure='450px' />
				</div>
			) : (
				<>{userAt}</>
			)}
		</div>
	)
}
