import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Container from '../components/Container';
import MainTemplate from '../components/Templates/MainTemplate';

import Playlists from '../views/Playlists';
import Songs from '../views/Songs';
import Genres from '../views/Genres';
import PlayerProvider from '../store/PlayerProvider';
import Player from '../components/Player';

export const HomePage = () => {
	const [playlists, setPlaylists] = useState([]);
	const [songs, setSongs] = useState([]);

	useEffect(() => {
		loadPlaylists();
		loadSongs();
	}, []);

	const loadPlaylists = async () => {
		const { data: { playlists } } = await axios.get('http://lml.god-development.com/api/playlist/all', { params: { limit: 6 } }, { withCredentials: true });
		setPlaylists(playlists);
	};

	const loadSongs = async () => {
		const { data: { songs } } = await axios.get('http://lml.god-development.com/api/song/all', { params: { limit: 6 } }, { withCredentials: true });
		setSongs(songs);
	};

	return (
		<MainTemplate header={<Header />}>
			<PlayerProvider>
				<Container>
					<Playlists list={playlists} />
					<Songs list={songs} />
					<Genres />
					<Player />
				</Container>
			</PlayerProvider>
		</MainTemplate>
	);
};

export default HomePage;