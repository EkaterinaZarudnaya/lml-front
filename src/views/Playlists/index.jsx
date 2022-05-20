import React from 'react';
import PropTypes from 'prop-types';
import Playlist from '../../components/Playlist';
import styles from './Playlists.module.scss';
import CreatePlaylist from '../../components/CreatePlaylist';

export const Playlists = ({
	title,
	allowedToAddNew,
	list = []
}) => {
	return (
		<div className={styles.wrapper}>
			<h2 className={styles.title}>
				<a href="/playlists">{title ? title : 'Playlists'}</a>
			</h2>
			<div className={styles.list}>
				{list.length > 0 && list.map(playlist => <Playlist key={playlist._id} playlist={playlist} />)}
				{allowedToAddNew && <CreatePlaylist />}
			</div>
		</div>
	);
};

Playlists.defaultProps = {
	allowedToAddNew: false
};

Playlists.propTypes = {
	list: PropTypes.array,
	title: PropTypes.string,
	allowedToAddNew: PropTypes.bool
};

export default Playlists;