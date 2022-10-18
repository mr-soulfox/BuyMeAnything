import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Account} from './pages/account'
import {ForgotPassword} from './pages/forgotPassword'
import {Home} from './pages/home'
import {NoMatch} from './pages/noMatch'
import {SignInUp} from './pages/sign'

export function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/sign/:typeOfSign' element={<SignInUp />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/account/:id' element={<Account />} />
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</Router>
	)
}
