import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './Songs.module.scss';

import Song from '../../components/Song';
import { useEffect } from 'react';
import { PlayerContext } from '../../store/PlayerProvider';

export const Songs = ({ column, hideTitle, small, list }) => {
	const { addToQueue } = useContext(PlayerContext);

	useEffect(() => {
		if (list.length > 0) addToQueue(list);
	}, []);

	return (
		<div className={`${styles.wrapper} ${small ? styles.small : ''}`}>
			{!hideTitle && <h2 className={styles.title}>Songs</h2>}
			<div className={styles.list}>
				{list.map(song =>
					<div key={'song' + song._id} className={`${styles.songWrap} ${styles[`col${column}`]}`}>
						<Song song={song} />
					</div>
				)}
			</div>
		</div>
	);
};

Songs.defaultProps = {
	column: 2,
	hideTitle: false,
	small: false,
	list: []
};

Songs.propTypes = {
	column: PropTypes.number,
	hideTitle: PropTypes.bool,
	small: PropTypes.bool,
	list: PropTypes.array
};

export default Songs;