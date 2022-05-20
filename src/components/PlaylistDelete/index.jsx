import React from 'react';
import styles from './PlaylistDelete.module.scss';

import deleteIcon from '../../static/icons/delete-song-icon.svg';

export const PlaylistDelete = () => (
	<button className={styles.button}>
		<img src={deleteIcon} alt="delete" />
	</button>
);

export default PlaylistDelete;