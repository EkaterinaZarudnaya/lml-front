import React from 'react';
import PropTypes from 'prop-types';

import styles from './MainTemplate.module.scss';

export const MainTemplate = ({
	header,
	background,
	children
}) => (
	<div className={styles.wrapper}>
		{background && (
			<div
				className={[styles.overlay]}
				style={{
					backgroundImage: `url(${background})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			/>
		)}
		{header && <div className={styles.header}>{header}</div>}
		<div className={styles.content}>
			{children}
		</div>
	</div>
);

MainTemplate.propTypes = {
	header: PropTypes.node,
	background: PropTypes.string,
	children: PropTypes.node.isRequired
};

export default MainTemplate;