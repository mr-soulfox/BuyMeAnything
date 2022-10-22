import {Meta} from '@storybook/react'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'
import {ForgotPassword} from '..'
import {store} from '../../../store'

export default {
	title: 'Pages/ForgotPassword',
	component: ForgotPassword,
	decorators: [
		(Story) => (
			<Provider store={store}>
				<MemoryRouter>
					<Story />
				</MemoryRouter>
			</Provider>
		),
	],
} as Meta

export const Default = {}
