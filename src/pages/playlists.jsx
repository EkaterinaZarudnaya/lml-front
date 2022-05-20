import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Container from '../components/Container';
import MainTemplate from '../components/Templates/MainTemplate';

import Playlists from '../views/Playlists';

export const PlaylistsPage = ({ playlists }) => {
	return (
		<MainTemplate header={<Header />}>
			<Container>
				<Playlists list={playlists} />
			</Container>
		</MainTemplate>
	);
};

PlaylistsPage.getInitialProps = async () => {
	const { data: { playlists } } = await axios.get('http://lml.god-development.com/api/playlist/all', { withCredentials: true });

	return { playlists };
};

PlaylistsPage.propTypes = {
	playlists: PropTypes.array
};

export default PlaylistsPage;