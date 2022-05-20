import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import styles from './Song.module.scss';

import playIcon from '../../static/icons/play-music-in-list.svg';
import likeIcon from '../../static/icons/like-icon-white.png';
import plusIcon from '../../static/icons/plus-icon-white.svg';
import pauseIcon from '../../static/icons/pause-song-icon.svg';
import downloadIcon from '../../static/icons/download-icon-white.png';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import { PlayerContext } from '../../store/PlayerProvider';

export const SongAction = ({ icon, onClick }) => (
	<div className={styles.action} onClick={onClick}>
		<img src={icon} alt="" />
	</div>
);

export const Song = ({ song }) => {
	const { name, artist, coverImage, _id } = song;
	const { user } = useContext(AuthContext);
	const { changeSong, playerData, songData, togglePlay } = useContext(PlayerContext);

	const addToFavorites = async (event) => {
		event.preventDefault();
		if (!_id || !user || !user.uid) return;
		const { data } = await axios.post('http://lml.god-development.com/api/playlist/favorites/addSong', { userId: user.uid, songId: _id }, { withCredentials: true });

		const blob = new Blob([data], { type: 'audio/mpeg' });
		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = `${name}-${artist}.mp3`;
		link.click();
	};

	const downloadSong = async (event) => {
		if (!_id) return;
		event.preventDefault();

		axios({
			url: 'http://lml.god-development.com/api/song/download',
			method: 'GET',
			params: { songId: _id },
			responseType: 'blob', // important
		}).then((response) => {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${name}.mp3`);
			document.body.appendChild(link);
			link.click();
		});
	};

	const handlePlayClick = (song) => {
		if (songData && songData._id == song._id) {
			return togglePlay();
		}
		changeSong({ song });
	};

	const isCurrentSongPlaying = (song) => {
		return playerData.isPlaying && songData._id === song._id;
	};

	return (
		<div className={`${styles.song} ${coverImage ? styles.hasImage : ''}`} style={{ backgroundImage: 'url(' + coverImage + ')' }}>
			<div className={styles.side}>
				<div className={`${styles.play} ${isCurrentSongPlaying(song) ? styles.pauseIcon : ''}`} onClick={() => handlePlayClick(song)}><img src={isCurrentSongPlaying(song) ? pauseIcon : playIcon} alt="" /></div>
				<div className={styles.info}>
					<div className={styles.name}>{name}</div>
					<div className={styles.artist}>{artist}</div>
				</div>
			</div>
			<div className={styles.side}>
				<div className={styles.actions}>
					<SongAction icon={likeIcon} onClick={addToFavorites} />
					<SongAction icon={plusIcon} />
					<SongAction icon={downloadIcon} onClick={downloadSong} />
				</div>
				<div className={styles.time}>00:00</div>
			</div>
		</div>
	);
};

SongAction.propTypes = {
	icon: PropTypes.any,
	onClick: PropTypes.func
};

Song.propTypes = {
	song: PropTypes.object
};

export default Song;