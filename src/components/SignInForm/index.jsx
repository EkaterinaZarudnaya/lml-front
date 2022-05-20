import React from 'react';
import PropTypes from 'prop-types';
import styles from './SignInForm.module.scss';

export const SignInFormGroup = ({ placeholder, type, name, onChange }) => (
	<div className={styles.group}>
		<input type={type} name={name} placeholder={placeholder} onChange={onChange} />
	</div>
);

export const SignInFormButton = () => (
	<button className={styles.button}>
		Login
	</button>
);

export const SignInForm = ({ handleChange, onSubmit }) => (
	<form className={styles.form} onSubmit={onSubmit}>
		<SignInFormGroup onChange={handleChange} name="email" type="email" placeholder="Login" />
		<SignInFormGroup onChange={handleChange} name="password" type="password" placeholder="Password" />
		<SignInFormButton />
	</form>
);

SignInForm.propTypes = {
	handleChange: PropTypes.func,
	onSubmit: PropTypes.func
};

SignInFormGroup.propTypes = {
	placeholder: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func
};

export default SignInForm;