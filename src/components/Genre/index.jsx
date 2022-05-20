import React from 'react';
import PropTypes from 'prop-types';
import styles from './Genre.module.scss';

export const Genre = ({
	id,
	image
}) => (
		<a href={`/genre/${id}`} className={styles.genresImg}>
			<img src={image} alt="Pop" />
		</a>
	);

Genre.propTypes = {
	id: PropTypes.string,
	image: PropTypes.any
};

export default Genre;