import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const initialState = {
	authenticated: false,
	user: null
};

export const AuthContext = createContext(initialState);

const AuthProvider = ({
	children
}) => {
	const [authenticated, setAuthenticated] = useState(initialState.authenticated);
	const [user, setUser] = useState(initialState.user);
	const router = useRouter();

	useEffect(() => {
		const authenticatedUser = localStorage.getItem('user');
		if (authenticatedUser) logIn(JSON.parse(authenticatedUser));
	}, []);

	const logIn = (user) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));

			setAuthenticated(true);
			setUser(user);
		}
	};

	const logOut = () => {
		localStorage.removeItem('user');
		setAuthenticated(false);
		setUser(null);
		router.push('/login');
	};

	return (
		<AuthContext.Provider value={{
			authenticated,
			user,
			logIn,
			logOut
		}}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.any
};

export default AuthProvider;