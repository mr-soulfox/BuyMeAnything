import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Account} from './pages/account'
import {Home} from './pages/home'
import {NoMatch} from './pages/noMatch'
import {SignInUp} from './pages/sign'

export function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/sign/:typeOfSign' element={<SignInUp />} />
				<Route path='/account/:id' element={<Account />} />
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</Router>
	)
}
