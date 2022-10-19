import {Meta} from '@storybook/react'
import {Provider} from 'react-redux'
import {MemoryRouter} from 'react-router-dom'
import {store} from '../../../store'
import {SignInUp} from '..'

export default {
	title: 'Pages/Sign',
	component: SignInUp,
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
