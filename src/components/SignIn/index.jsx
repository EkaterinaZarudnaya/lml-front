import React from 'react';
import PropTypes from 'prop-types';
import styles from './SignIn.module.scss';
import { SocialButtons } from '../SocialButtons';
import SignInForm from '../SignInForm';

import logo from '../../static/lml-logo.png';

export const SignIn = ({ error, onSubmit, handleChange }) => (
	<div className={styles.signIn}>
		<div className={styles.signInContent}>
			<div className={styles.signInLogo}>
				<img src={logo} alt="logo" />
			</div>
			<div className={styles.signInTitle}>
				LML account sign in
			</div>
			<SignInForm onSubmit={onSubmit} handleChange={handleChange} />
			<div className="sign-in-social">
				<SocialButtons />
			</div>
			{error && <div className={styles.error}>{error}</div>}
		</div>
	</div>
);

SignIn.propTypes = {
	error: PropTypes.string,
	onSubmit: PropTypes.func,
	handleChange: PropTypes.func
};

export default SignIn;