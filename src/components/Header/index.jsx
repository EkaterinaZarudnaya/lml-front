import React from 'react';
import Container from '../Container';
import styles from './Header.module.scss';
import PropTypes from 'prop-types';

import { Search } from '../Search';

import logo from '../../static/lml-logo.png';
import userIcon from '../../static/user-placeholder.svg';
import likeIcon from '../../static/icons/like-icon.svg';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';

export const HeaderLogo = () => (
	<a href="/" className={styles.logo}>
		<img src={logo} alt="LML" />
	</a>
);

export const HeaderNav = () => (
	<div className={styles.nav}>
		<ul className={styles.navList}>
			<li><a href="/">Home</a></li>
			<li><a href="/playlists">Playlists</a></li>
		</ul>
	</div>
);

export const HeaderProfile = ({ logOut }) => (
	<div className={styles.profile}>
		<a href="#" className={styles.profileLike}>
			<img src={likeIcon} alt="" />
		</a>
		<a href="/my-music" className={styles.profileMusic}>My Music</a>
		<div className={styles.menu}>
			<a href="/my-music" className={styles.profileImage}>
				<img src={userIcon} alt="" />
			</a>
			<div className={styles.menuContent}>
				<ul className={styles.menuList}>
					<li onClick={logOut}>Log Out</li>
				</ul>
			</div>
		</div>
	</div>
);

export const Header = () => {
	const { logOut } = useContext(AuthContext);

	return (
		<header className={styles.header}>
			<Container>
				<div className={styles.content}>
					<HeaderLogo />
					<Search />
					<HeaderNav />
					<HeaderProfile logOut={logOut} />
				</div>
			</Container>
		</header>
	);
};

HeaderProfile.propTypes = {
	logOut: PropTypes.func
};

export default Header;