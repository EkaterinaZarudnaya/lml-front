import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Container from '../../components/Container';
import MainTemplate from '../../components/Templates/MainTemplate';
import Songs from '../../views/Songs';

import PlayerProvider from '../../store/PlayerProvider';
import Player from '../../components/Player';

export const GenrePage = ({ songs }) => {
	return (
		<MainTemplate header={<Header />}>
			<Container>
				<PlayerProvider>
					<Songs small={true} list={songs} hideTitle={true} column={1} />
					<Player />
				</PlayerProvider>
			</Container>
		</MainTemplate>
	);
};

GenrePage.getInitialProps = async (context) => {
	const { gid } = context.query;

	const { data: { songs } } = await axios.get('http://lml.god-development.com/api/song/all', { params: { genre: gid }, withCredentials: true });

	return { songs };
};

GenrePage.propTypes = {
	songs: PropTypes.array
};

export default GenrePage;