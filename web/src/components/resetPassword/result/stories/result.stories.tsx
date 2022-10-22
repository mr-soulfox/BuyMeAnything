import {Meta} from '@storybook/react'
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
} as Meta

export const Default = {}
