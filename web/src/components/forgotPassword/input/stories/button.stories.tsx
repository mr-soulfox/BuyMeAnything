import {Meta} from '@storybook/react'
import {Provider} from 'react-redux'
import {ButtonInputBox} from '../button'
import {store} from '../../../../store'

export default {
	title: 'Components/ForgotPassword/Button',
	component: ButtonInputBox,
	decorators: [
		(Story) => (
			<Provider store={store}>
				<Story />
			</Provider>
		),
	],
} as Meta

export const Default = {}
