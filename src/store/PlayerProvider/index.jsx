import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const PlayerContext = React.createContext({});

const PlayerProvider = ({ children }) => {
	const [playerData, setPlayerData] = useState({
		progress: 0,
		isSeeking: false,
		isPlaying: false,
		loop: false
	});
	const [songData, setSongData] = useState({});
	const [audio, setAudio] = useState(null);
	const [queue, setQueue] = useState([]);

	const addToQueue = (list) => {
		setQueue(list);
	};

	const onPlay = () => {
		setPlayerData({
			...playerData,
			isPlaying: true,
			isSeeking: false
		});
	};

	const onPause = () => {
		setPlayerData({
			...playerData,
			isPlaying: false
		});
	};

	const onEnded = () => {
		changeSong({ direction: 'next' });
		setPlayerData({
			...playerData,
			isPlaying: true,
			isSeeking: true
		});
	};

	const changeSong = ({ song, direction }) => {
		console.log(direction);
		setSongData(song);
	};

	const togglePlay = () => {
		if (playerData.isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
	};

	const initPlayer = (ref) => {
		setAudio(ref);
		initListeners();
	};

	const initListeners = () => {
		// audio.current.addEventListener('loadeddata', this.onLoadedData);
		if (audio) {
			audio.addEventListener('play', onPlay);
			audio.addEventListener('pause', onPause);
			audio.addEventListener('ended', onEnded);
		}
	};

	return (
		<PlayerContext.Provider value={{
			queue,
			playerData,
			songData,
			addToQueue,
			changeSong,
			togglePlay,
			onPlay,
			onPause,
			onEnded,
			initPlayer
		}}>
			{children}
		</PlayerContext.Provider>
	);
};

PlayerProvider.propTypes = {
	children: PropTypes.any
};

export default PlayerProvider;