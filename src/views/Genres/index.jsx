import React from 'react';
import Genre from '../../components/Genre';
import styles from './Genres.module.scss';

export const genres_api = [
	{
		id: 'blues',
		label: 'Blues',
		image: require('../../static/genre-blues.jpg')
	},
	{
		id: 'classical',
		label: 'Classical',
		image: require('../../static/genre-classical.jpg')
	},
	{
		id: 'jazz',
		label: 'Jazz',
		image: require('../../static/genre-jazz.jpg')
	},
	{
		id: 'pop',
		label: 'Pop',
		image: require('../../static/genre-pop.jpg')
	},
	{
		id: 'randb',
		label: 'R&B',
		image: require('../../static/genre-r&b.jpg')
	},
	{
		id: 'rap',
		label: 'Rap',
		image: require('../../static/genre-rap.jpg')
	},
	{
		id: 'rock',
		label: 'Rock',
		image: require('../../static/genre-rock.jpg')
	},
	{
		id: 'soundtracks',
		label: 'Soundtracks',
		image: require('../../static/genre-soundtracks.jpg')
	},
];

export const Genres = () => (
	<div className={styles.wrapper}>
		<h2 className={styles.title}>
			Genres
		</h2>
		<div className={styles.list}>
			{genres_api.map(genre => <Genre key={'genre' + genre.id} id={genre.id} image={genre.image} />)}
		</div>
	</div>
);

export default Genres;