import {Meta} from '@storybook/react'
import {Provider} from 'react-redux'
import {EmailInputBox} from '../email'
import {store} from '../../../../store'

export default {
	title: 'Components/ForgotPassword/Email',
	component: EmailInputBox,
	decorators: [
		(Story) => (
			<Provider store={store}>
				<Story />
			</Provider>
		),
	],
} as Meta

export const Default = {}
