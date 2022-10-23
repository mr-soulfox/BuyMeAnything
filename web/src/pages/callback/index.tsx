import {useParams} from 'react-router-dom'
import {useQuery} from '../../hooks/useQuery'

export function Callback() {
	const {social} = useParams()
	const query = useQuery()

	return (
		<div>
			Callback {social} - {query.get('code')}
		</div>
	)
}
