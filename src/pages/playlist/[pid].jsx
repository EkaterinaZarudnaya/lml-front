import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from '../../components/Header';
import Container from '../../components/Container';
import MainTemplate from '../../components/Templates/MainTemplate';

import Songs from '../../views/Songs';
import ContentHeader from '../../components/ContentHeader';
import ContentHeaderInfo from '../../components/ContentHeaderInfo';
import PlaylistCover from '../../components/PlaylistCover';
import PlaylistButtons from '../../components/PlaylistButtons';
import PlaylistDelete from '../../components/PlaylistDelete';
import { Player } from '../../components/Player';
import PlayerProvider from '../../store/PlayerProvider';

const PlaylistPage = ({ playlist, owner }) => {
	return (
		<MainTemplate header={<Header />}>
			<Container>
				<PlayerProvider>
					<ContentHeader>
						<PlaylistCover coverImage={playlist.coverImage} visible={playlist.visible} />
						<ContentHeaderInfo subtitle={playlist.description} title={playlist.name} username={`${owner.firstName} ${owner.lastName}`} />
						<PlaylistButtons />
						{!playlist.createdAutomatically && <PlaylistDelete />}
					</ContentHeader>
					<Songs list={playlist.songs} small={true} hideTitle={true} column={1} />
					<Player />
				</PlayerProvider>
			</Container>
		</MainTemplate>
	);
};

PlaylistPage.propTypes = {
	playlist: PropTypes.object,
	owner: PropTypes.object
};

PlaylistPage.getInitialProps = async (context) => {
	const { pid } = context.query;

	const { data: { playlist, owner } } = await axios.get(`http://lml.god-development.com/api/playlist/${pid}`, { withCredentials: true });

	return { playlist: playlist, owner: owner };
};

export default PlaylistPage;