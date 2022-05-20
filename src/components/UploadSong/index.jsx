import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './UploadSong.module.scss';
import uploadIcon from '../../static/icons/upload-song.svg';

import Popup from '../Popup';
import { PlaylistButton } from '../PlaylistButtons';
import { genres_api } from '../../views/Genres';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import { useRouter } from 'next/router';

const songInitialData = {
	name: '',
	artist: '',
	genres: 'nogenre',
	coverImage: '',
	singleSong: '',
};

const FormGroup = ({ id, label, placeholder, onChange }) => (
	<div className={styles.group}>
		<label htmlFor={id}>{label}</label>
		<input type="text" name={id} id={id} placeholder={placeholder} onChange={onChange} />
	</div>
);

const GenrePicker = ({ genres = [], onChange }) => (
	<div className={styles.group}>
		<label htmlFor="genres">Genre</label>
		<select name="genre" id="genres" onChange={onChange}>
			<option value="nogenre">No Genre</option>
			{genres.map(genre => <option key={genre.id} value={genre.id}>{genre.label}</option>)}
		</select>
	</div>
);

const UploadFormGroup = ({ id, onChange }) => (
	<input type="file" onChange={onChange} id={id} name={id} />
);

export const UploadSong = () => {
	const { user } = useContext(AuthContext);
	const router = useRouter();

	const [error, setError] = useState('');
	const [open, setOpen] = useState(false);
	const [singleSong, setSingleSong] = useState(null);
	const [songData, setSongData] = useState(songInitialData);

	const togglePopup = (event) => {
		event.preventDefault();
		setOpen(!open);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setError('');

		setSongData({
			...songData,
			[name]: value
		});
	};

	const handleFileChange = (event) => {
		const { files } = event.target;
		setError('');
		setSingleSong({ singleSong: files[0] });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { pid } = router.query;

		if (!singleSong || !user || !pid) return setError('Error: Please check required fields');

		const data = {
			...songData,
			...singleSong,
			ownerId: user.uid
		};

		const formData = new FormData();
		for (let name in data) {
			formData.append(name, data[name]);
		}

		let response = await axios.post('http://lml.god-development.com/api/song/upload', formData, { withCredentials: true });
		let { error, song } = response.data;

		if (error) return setError(error);

		response = await axios.post('http://lml.god-development.com/api/playlist/addSong', { playlistId: pid, songId: song._id }, { withCredentials: true });
		let responseData = response.data;

		if (responseData && responseData.error) return setError(error);

		setOpen(false);
		setSingleSong(null);
		setSongData(songInitialData);
		router.reload();
	};

	return (
		<>
			<PlaylistButton icon={uploadIcon} title="Upload" onClick={togglePopup} />
			<Popup isOpen={open} togglePopup={togglePopup}>
				<div className={styles.title}>Upload Song</div>
				<form method="POST" encType="multipart/form-data" className="form" onSubmit={handleSubmit}>
					<FormGroup id="name" onChange={handleChange} label="Song name" placeholder="New song" />
					<FormGroup id="artist" onChange={handleChange} label="Artist" placeholder="Artist name" />
					<FormGroup id="coverImage" onChange={handleChange} label="Cover Image" placeholder="Image link" />
					<GenrePicker onChange={handleChange} genres={genres_api} />
					<UploadFormGroup id='singleSong' onChange={handleFileChange} />
					<div className={styles.buttonWrap}>
						<button className={styles.button}>Upload</button>
					</div>
					{error && <div className={styles.error}>{error}</div>}
				</form>
			</Popup>
		</>
	);
};

FormGroup.propTypes = {
	id: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func
};

UploadFormGroup.propTypes = {
	id: PropTypes.string,
	onChange: PropTypes.func
};

GenrePicker.propTypes = {
	genres: PropTypes.array,
	onChange: PropTypes.func
};

export default UploadSong;