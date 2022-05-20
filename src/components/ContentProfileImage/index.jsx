import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContentProfileImage.module.scss';

import placeholder from '../../static/user-placeholder.svg';

export const ContentProfileImage = ({ image }) => (
	<div className={styles.content}>
		<div className={styles.image}>
			{image && <img src={image} alt="user" />}
			{!image && <img src={placeholder} alt="user" />}
		</div>
		{!image && <div className={styles.add}>Add photo</div>}
	</div>
);

ContentProfileImage.propTypes = {
	image: PropTypes.any
};

export default ContentProfileImage;