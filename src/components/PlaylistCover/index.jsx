import React from 'react';
import PropTypes from 'prop-types';
import styles from './PlaylistCover.module.scss';

import playlistPrivate from '../../static/private-playlist.png';
import coverImagePlaceholder from '../../static/playlist.png';
import favoritesPlaylistCover from '../../static/favoritesPlaylist.png';

export const PlaylistCover = ({ coverImage, visible = false }) => {
	let imageURL = coverImage ? coverImage : coverImagePlaceholder;
	imageURL = imageURL === 'favoritesPlaylist.png' ? favoritesPlaylistCover : imageURL;

	return (
		<div className={styles.playlistCover} style={{ backgroundImage: `url(${imageURL})` }}>
			{!visible && <div className={styles.playlistPrivate}><img src={playlistPrivate} alt="playlistPrivate" /></div>}
			{!coverImage && <div className={styles.playlistAddCover}>
				<div className={styles.playlistAddCoverText}>
					Add cover
				</div>
			</div>}
		</div>
	);
};

PlaylistCover.propTypes = {
	coverImage: PropTypes.string,
	visible: PropTypes.bool
};

export default PlaylistCover;