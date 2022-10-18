import {Meta, StoryObj} from '@storybook/react'
import {MemoryRouter} from 'react-router-dom'
import {BackButton} from '..'

export default {
	title: 'Components/Sign/BackButton',
	component: BackButton,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		),
	],
	argTypes: {onClick: {action: 'clicked'}},
} as Meta

export const Default: StoryObj = {}
