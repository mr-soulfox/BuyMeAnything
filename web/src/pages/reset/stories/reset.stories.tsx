import {Meta} from '@storybook/react'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import {ResetPassword} from '..'

export default {
	title: 'Pages/Reset',
	component: ResetPassword,
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={['/reset/1234567/0']}>
				<Routes>
					<Route path='/reset/:confirmCode/:id' element={<Story />} />
				</Routes>
			</MemoryRouter>
		),
	],
} as Meta

export const Default = {}
