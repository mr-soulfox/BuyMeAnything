import {Meta} from '@storybook/react'
import {MemoryRouter} from 'react-router-dom'
import {InputBox} from '../input'
import email from '../../../../assets/email.svg'
import invalid from '../../../../assets/inValid.svg'
import '../style/input.scss'

export default {
	title: 'Components/Sign/Input',
	component: InputBox,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
	args: {
		validate: true,
	},
	argTypes: {
		type: {
			options: ['e-mail', 'password'],
			control: 'inline-radio',
			defaultValue: 'e-mail',
		},
		icon: {
			control: {type: 'file', accept: '.svg'},
			defaultValue: email,
		},
		placeholder: {
			control: 'text',
			defaultValue: 'Joe@example.com',
		},
		typeOfSign: {
			control: 'inline-radio',
			options: ['up', 'in'],
			defaultValue: 'up',
		},
		iconValidate: {
			control: {type: 'file', accept: '.svg'},
			defaultValue: invalid,
		},
		validate: {
			control: false,
		},
		changeValue: {
			control: false,
		},
	},
} as Meta

export const Default = {}
