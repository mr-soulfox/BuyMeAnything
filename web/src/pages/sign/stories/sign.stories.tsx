import {Meta} from '@storybook/react'
import {MemoryRouter} from 'react-router-dom'
import {SignInUp} from '..'

export default {
	title: 'Pages/Sign',
	component: SignInUp,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
} as Meta

export const Default = {}
