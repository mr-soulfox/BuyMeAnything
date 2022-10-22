import {Story} from '@storybook/react/types-6-0'
import {Meta, StoryObj} from '@storybook/react'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import {ResetPassword} from '..'

export default {
	title: 'Pages/Reset',
	component: ResetPassword,
} as Meta

const Template: Story<any> = (args) => {
	const {code} = args
	return (
		<MemoryRouter initialEntries={[`/reset/${code}/0`]}>
			<Routes>
				<Route path='/reset/:confirmCode/:id' element={<ResetPassword />} />
			</Routes>
		</MemoryRouter>
	)
}

export const Default = Template.bind({})
Default.args = {code: '1234567'}

export const InValid = Template.bind({})
InValid.args = {code: '12345678'}
