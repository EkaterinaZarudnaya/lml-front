import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentHeader.module.scss';

export const ContentHeader = ({ children }) => (
	<div className={styles.content}>
		{children}
	</div>
);

ContentHeader.propTypes = {
	children: PropTypes.node.isRequired
};

export default ContentHeader;