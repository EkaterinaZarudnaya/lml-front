import React from 'react';
import { storiesOf } from '@storybook/react';
import MainTemplate from './index';
import Header from '../../Header';

storiesOf('Templates|MainTemplate', module)
	.add('Default', () => (
		<MainTemplate header={<Header />}>

		</MainTemplate>
	));