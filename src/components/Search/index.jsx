import React from 'react';
import styles from './Search.module.scss';

import searchIcon from '../../static/query_icon.png';

const SearchInput = () => (
	<div className={styles.inputWrapper}>
		<input className={styles.input} type="text" placeholder="Song name, Artist, etc." />
		<div className={styles.query}>
			<img src={searchIcon} alt="query" />
		</div>
	</div>
);

export const Search = () => (
	<div className="search">
		<SearchInput />
	</div>
);

export default Search;