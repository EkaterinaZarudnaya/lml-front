import React from 'react';
import PropTypes from 'prop-types';
import AuthProvider from '../store/AuthProvider';
import '../assets/scss/index.scss';

const App = ({ Component, pageProps }) => (
	<AuthProvider>
		<Component {...pageProps} />
	</AuthProvider>
);

App.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any
};

export default App;