import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Account} from './pages/account'
import {Callback} from './pages/callback'
import {ForgotPassword} from './pages/forgotPassword'
import {Help} from './pages/help'
import {Home} from './pages/home'
import {NoMatch} from './pages/noMatch'
import {ResetPassword} from './pages/reset'
import {SignInUp} from './pages/sign'

export function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/sign/:typeOfSign' element={<SignInUp />} />
				<Route path='/help' element={<Help />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/reset/:confirmCode/:id' element={<ResetPassword />} />
				<Route path='/account/:userAt' element={<Account />} />
				<Route path='/callback/:social' element={<Callback />} />
				<Route path='*' element={<NoMatch />} />
			</Routes>
		</Router>
	)
}
