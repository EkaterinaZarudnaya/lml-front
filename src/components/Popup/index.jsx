import React from 'react';
import PropTypes from 'prop-types';
import styles from './Popup.module.scss';

import closeIcon from '../../static/icons/close-icon.svg';

export const Popup = ({ children, isOpen, togglePopup }) => {
	return (
		<div className={`${styles.popup} ${isOpen ? styles.open : ''}`}>
			<div className={styles.wrapper}>
				<div className={styles.box}>
					<div className={styles.close} onClick={togglePopup} ><img src={closeIcon} alt="close" /></div>
					<div className={styles.content}>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

Popup.defaultProps = {
	isOpen: false
};

Popup.propTypes = {
	children: PropTypes.node.isRequired,
	isOpen: PropTypes.bool,
	togglePopup: PropTypes.func
};

export default Popup;