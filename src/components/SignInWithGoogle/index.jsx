import React from 'react';
import styles from './SignInWithGoogle.module.scss';

import googlePlusIcon from '../../static/icons/google-plus-icon.svg';

export const SignInWithGoogle = () => {
	const handleClick = (e) => {
		e.preventDefault();
		window.location.replace('/');
	};

	return (
		<button className={styles.button} onClick={handleClick}>
			<img src={googlePlusIcon} alt="google-plus" />
			Sign in with Google
		</button>
	);
};

export default SignInWithGoogle;