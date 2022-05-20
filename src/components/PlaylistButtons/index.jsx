import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlaylistButtons.module.scss';

import randomlyIcon from '../../static/icons/play-randomly-icon.svg';
import UploadSong from '../UploadSong';

export const PlaylistButton = ({ icon, title, onClick }) => (
	<button className={styles.button} onClick={onClick}>
		{icon && <img src={icon} alt="icon" />}
		<span>{title}</span>
	</button>
);

export const PlaylistButtons = () => (
	<div className={styles.list}>
		<PlaylistButton icon={randomlyIcon} title="Randomly" />
		<UploadSong />
	</div>
);

PlaylistButton.propTypes = {
	icon: PropTypes.any,
	onClick: PropTypes.func,
	title: PropTypes.string.isRequired
};

export default PlaylistButtons;