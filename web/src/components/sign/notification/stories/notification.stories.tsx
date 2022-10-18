import {Notification} from '..'
import {Meta} from '@storybook/react'
import success from '../../../../assets/successSign.svg'

export default {
	title: 'Components/Sign/Notification',
	component: Notification,
	argTypes: {
		status: {
			control: 'boolean',
			defaultValue: true,
		},
		icon: {
			control: {type: 'file', accept: '.svg'},
			defaultValue: success,
		},
	},
} as Meta

export const Default = {}
