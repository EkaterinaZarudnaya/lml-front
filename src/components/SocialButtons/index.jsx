import React from 'react';
import styles from './SocialButtons.module.scss';

import instagramIcon from '../../static/icons/instagram-icon.svg';
import facebookIcon from '../../static/icons/facebook-icon.svg';
import youtubeIcon from '../../static/icons/youtube-icon.svg';

export const SocialButtons = () => (
	<div className={styles.social}>
		<ul className={styles.list}>
			<li><a href="#"><img src={instagramIcon} alt="icon" /></a></li>
			<li><a href="#"><img src={facebookIcon} alt="icon" /></a></li>
			<li><a href="#"><img src={youtubeIcon} alt="icon" /></a></li>
		</ul>
	</div>
);

export default SocialButtons;