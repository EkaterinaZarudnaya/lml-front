import React from 'react';
import PropTypes from 'prop-types';
import styles from './Player.module.scss';

import prevIcon from '../../static/icons/song-back-icon.svg';
import nextIcon from '../../static/icons/song-forward-icon.svg';
import playIcon from '../../static/icons/play-song-icon.svg';
import pauseIcon from '../../static/icons/pause-song-icon.svg';
import downloadIcon from '../../static/icons/download-icon.svg';
import shuffleIcon from '../../static/icons/play-randomly-icon.svg';
import repeatIcon from '../../static/icons/repeat-song-icon.svg';
import volumeIcon from '../../static/icons/volume-song-icon.svg';
import { useContext } from 'react';
import { PlayerContext } from '../../store/PlayerProvider';

export const PlayerAction = ({ icon }) => (
	<div className={styles.action}><img src={icon} alt="icon" /></div>
);

export const PlayerActions = () => (
	<div className={styles.actions}>
		<PlayerAction icon={downloadIcon} />
		<PlayerAction icon={shuffleIcon} />
		<PlayerAction icon={repeatIcon} />
		<PlayerAction icon={volumeIcon} />
	</div>
);

export const PlayerSong = ({ name, artist }) => (
	<div className={styles.song}>
		<div className={styles.songName}>{name}</div>
		<a href="#" className={styles.songArtist}>{artist}</a>
	</div>
);

export const PlayerControl = ({ icon, onClick, controlClass = '' }) => (
	<div onClick={onClick} className={`${styles.control} ${controlClass}`}><img src={icon} alt="icon" /></div>
);

export const PlayerControls = ({ isPlaying, changeSong, togglePlay }) => (
	<div className={styles.controls}>
		<PlayerControl onClick={() => changeSong({ direction: 'prev' })} icon={prevIcon} />
		<PlayerControl controlClass={styles.play} onClick={togglePlay} icon={isPlaying ? pauseIcon : playIcon} />
		<PlayerControl onClick={() => changeSong({ direction: 'next' })} icon={nextIcon} />
	</div>
);

export const PlayerProgress = () => (
	<div className={styles.progress}>
		<div className={styles.progressLine}></div>
	</div>
);

export const Player = () => {
	const { songData, playerData, initPlayer, changeSong, togglePlay } = useContext(PlayerContext);

	return (
		<div className={`${styles.player} ${songData.filepath ? styles.showPlayer : ''}`}>
			<div className={styles.container}>
				<audio
					ref={ref => initPlayer(ref)}
					autoPlay
					src={`http://lml.god-development.com/api/${songData.filepath}`}
					crossOrigin='anonymous'
					loop={playerData.loop}
				></audio>
				<PlayerProgress />
				<div className={styles.content}>
					<PlayerControls isPlaying={playerData.isPlaying} changeSong={changeSong} togglePlay={togglePlay} />
					{songData.name && songData.artist && <PlayerSong name={songData.name} artist={songData.artist} />}
					<PlayerActions />
				</div>
			</div>
		</div>
	);
};

PlayerControl.propTypes = {
	icon: PropTypes.any,
	onClick: PropTypes.func,
	controlClass: PropTypes.any
};

PlayerAction.propTypes = {
	icon: PropTypes.any
};

PlayerControls.propTypes = {
	changeSong: PropTypes.func,
	togglePlay: PropTypes.func,
	isPlaying: PropTypes.bool
};

PlayerSong.propTypes = {
	name: PropTypes.string.isRequired,
	artist: PropTypes.string.isRequired,
};

export default Player;