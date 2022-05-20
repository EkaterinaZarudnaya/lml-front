import React from 'react';
import PropTypes from 'prop-types';
import styles from './Playlist.module.scss';

import playlistImg from '../../static/playlist.png';
import favoritesImg from '../../static/favoritesPlaylist.png';
import playlistPrivate from '../../static/private-playlist.png';

export const Playlist = ({ playlist }) => {
	const { isPrivate, name, coverImage, _id } = playlist;

	let image = coverImage ? coverImage === 'favoritesPlaylist.png' ? favoritesImg : coverImage : playlistImg;

	return (
		<a href={`/playlist/${_id}`} className={styles.playlist}>
			{isPrivate && <div className={styles.playlistPrivate}><img src={playlistPrivate} alt="playlistPrivate" /></div>}
			<div className={styles.playlistImg}>
				<img src={image} alt="playlist" />
			</div>
			<div className={styles.playlistName}>
				{name}
			</div>
		</a>
	);
};

Playlist.propTypes = {
	playlist: PropTypes.object
};

export default Playlist;