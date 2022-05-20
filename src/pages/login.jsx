import React, { useState, useContext, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import Container from '../components/Container';
import MainTemplate from '../components/Templates/MainTemplate';

import { SignIn } from '../components/SignIn';
import { AuthContext } from '../store/AuthProvider';

import pageBg from '../static/login-page-bg.jpg';


export const LoginPage = () => {
	const {
		authenticated, logIn
	} = useContext(AuthContext);

	useEffect(() => {
		if (authenticated) { Router.push('/'); }
	});

	const [credentials, setCredentials] = useState({ email: '', password: '' });
	const [error, setError] = useState('');

	const handleInputChange = event => {
		const { name, value } = event.target;
		setCredentials({ ...credentials, [name]: value });

		if (error) setError('');
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const { data } = await axios.post('http://lml.god-development.com/api/login', { email: credentials.email, password: credentials.password }, { withCredentials: true });

		if (data && data.error) return setError(data.error);

		logIn(data);
	};

	return (
		<MainTemplate background={pageBg}>
			<Container>
				<SignIn error={error} handleChange={handleInputChange} onSubmit={handleFormSubmit} />
			</Container>
		</MainTemplate>
	);
};

export default LoginPage;