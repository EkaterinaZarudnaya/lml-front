import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentHeaderInfo.module.scss';

export const ContentHeaderInfo = ({ subtitle, title, username }) => (
	<div className={styles.content}>
		<div className={styles.subtitle}>
			{subtitle ? subtitle : 'My Music'}
		</div>
		{title && <div className={styles.title}>{title}</div>}
		{username && <div className={styles.username}>{username}</div>}
	</div>
);

ContentHeaderInfo.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	username: PropTypes.string
};

export default ContentHeaderInfo;