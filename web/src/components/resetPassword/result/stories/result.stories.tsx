import {Meta} from '@storybook/react'
import {MemoryRouter} from 'react-router-dom'
import {ResultResetPassword} from '..'

export default {
	title: 'Components/ResetPassword/Result',
	component: ResultResetPassword,
	argTypes: {
		confirmCode: {
			control: 'text',
			defaultValue: '1234567',
		},
		id: {
			control: 'none',
			defaultValue: '0',
		},
		valid: {
			options: [true, false],
			control: 'inline-radio',
			defaultValue: true,
		},
	},
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
} as Meta

export const Default = {}
