import {Meta} from '@storybook/react'
import {MemoryRouter} from 'react-router-dom'
import {NoMatch} from '..'

export default {
	title: 'Pages/404',
	component: NoMatch,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
} as Meta

export const Default = {}
