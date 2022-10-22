import {Meta} from '@storybook/react'
import {Provider} from 'react-redux'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import {store} from '../../../store'
import {SignInUp} from '..'
import {Story} from '@storybook/react/types-6-0'

export default {
	title: 'Pages/Sign',
	component: SignInUp,
} as Meta

const Template: Story<any> = (args: any) => {
	const {path} = args
	return (
		<Provider store={store}>
			<MemoryRouter initialEntries={path}>
				<Routes>
					<Route path='/sign/:typeOfSign' element={<SignInUp />} />
				</Routes>
			</MemoryRouter>
		</Provider>
	)
}

export const Default = Template.bind({})
Default.args = {path: ['/sign/up']}

export const SignUp = Template.bind({})
SignUp.args = {path: ['/sign/in']}
