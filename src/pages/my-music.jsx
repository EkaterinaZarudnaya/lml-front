import React, { useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Container from '../components/Container';
import MainTemplate from '../components/Templates/MainTemplate';

import Playlists from '../views/Playlists';
import ContentHeader from '../components/ContentHeader';
import ContentHeaderInfo from '../components/ContentHeaderInfo';
import ContentProfileImage from '../components/ContentProfileImage';
import { AuthContext } from '../store/AuthProvider';
import { useState } from 'react';
import { useEffect } from 'react';

export const MyMusicPage = () => {
	const { user } = useContext(AuthContext);

	// const [otherPlaylists, setOtherPlaylists] = useState([]);
	const [myPlaylists, setMyPlaylists] = useState([]);

	useEffect(() => {
		if (user) loadPlaylists();
	}, [user]);

	const loadPlaylists = async () => {
		const { data: { playlists, error } } = await axios.get(`http://lml.god-development.com/api/user/playlists?userId=${user.uid}`, { withCredentials: true });

		if (error) return;

		splitPlaylists(playlists);
	};

	const splitPlaylists = (playlists) => {
		let other = [];
		let myPlaylists = [];

		playlists.forEach(one => {
			if (one.owner === user.uid) {
				myPlaylists.unshift(one);
				return;
			}

			other.push(one);
		});

		// setOtherPlaylists(other);
		setMyPlaylists(myPlaylists);
	};

	return (
		<MainTemplate header={<Header />}>
			<Container>
				{user && <ContentHeader>
					<ContentProfileImage />
					<ContentHeaderInfo title={user.name} subtitle="My Music" />
				</ContentHeader>}
				<Playlists list={myPlaylists} title="My Playlists" allowedToAddNew={true} />
				{/* <Playlists list={otherPlaylists} title="Other Playlists" /> */}
			</Container>
		</MainTemplate>
	);
};

MyMusicPage.propTypes = {
	playlists: PropTypes.array
};

export default MyMusicPage;