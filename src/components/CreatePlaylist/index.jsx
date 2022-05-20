import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Popup from '../Popup';

import styles from './CreatePlaylist.module.scss';
import checkIcon from '../../static/icons/check-mark.svg';
import plusIcon from '../../static/icons/plus-icon.svg';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import { useRouter } from 'next/router';

const FormGroup = ({ id, label, placeholder, onChange }) => (
	<div className={styles.group}>
		<label htmlFor={id}>{label}</label>
		<input type="text" name={id} id={id} onChange={onChange} placeholder={placeholder} />
	</div>
);

export const CustomCheckbox = ({ onChange }) => (
	<div className={styles.group}>
		<label htmlFor="customCheckbox" className={styles.checkbox}>
			<input name="visible" type="checkbox" onChange={onChange} id="customCheckbox" />
			<span>
				Public
				<img className={styles.check} src={checkIcon} alt="checked" />
			</span>
		</label>
	</div>
);

export const CreatePlaylistButton = ({ onClick }) => (
	<a href="#" className={styles.playlist} onClick={onClick}>
		<div className={styles.playlistImg}>
			<div className={styles.new}><img src={plusIcon} alt="" /></div>
		</div>
	</a>
);

const playlistInitialState = {
	name: '',
	description: '',
	visible: false
};

export const CreatePlaylist = () => {
	const [open, setOpen] = useState(false);
	const [error, setError] = useState('');
	const [playlistData, setPlaylistData] = useState(playlistInitialState);
	const { user } = useContext(AuthContext);
	const router = useRouter();

	const togglePopup = (event) => {
		event.preventDefault();
		setOpen(!open);
	};

	const handleFormChange = (event) => {
		let { name, value } = event.target;

		if (name === 'visible') value = event.target.checked;

		setError('');
		setPlaylistData({ ...playlistData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		if (!user) return;

		const formData = { ...playlistData, ownerId: user.uid };

		let { data: { error } } = await axios.post('http://lml.god-development.com/api/playlist/create', formData, { withCredentials: true });

		if (error) return setError(error);

		router.reload();
	};

	return (
		<div className="wrapper">
			<CreatePlaylistButton onClick={togglePopup} />
			<Popup isOpen={open} togglePopup={togglePopup}>
				<div className={styles.title}>Create new playlist</div>
				<form onSubmit={handleFormSubmit} className="form">
					<FormGroup onChange={handleFormChange} id="name" label="Playlist name..." placeholder="New playlist" />
					<FormGroup onChange={handleFormChange} id="description" label="Add description..." placeholder="Description..." />
					<CustomCheckbox onChange={handleFormChange} />
					<div className={styles.buttonWrap}>
						<button className={styles.button}>Create</button>
					</div>

					{error && <div className={styles.error}>{error}</div>}
				</form>
			</Popup>
		</div>
	);
};

FormGroup.propTypes = {
	id: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func
};

CustomCheckbox.propTypes = {
	onChange: PropTypes.func
};

CreatePlaylistButton.propTypes = {
	onClick: PropTypes.func
};

export default CreatePlaylist;