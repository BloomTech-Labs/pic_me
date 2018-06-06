import React, { Component } from 'react';
import axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-input';
import styled from 'styled-components';
import styles from './Tags.css';
import Image from 'react-image-resizer';

axios.defaults.withCredentials = true;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10%;
`;

const Input = styled.input`
	font-size: 14px;
	margin-bottom: 10px;
`;

// const TagForm = styled.form`
// 	// margin: 20px;
// 	font-size: 12px;
// `;

// const FileInput = styled.input`
// 	// background: #2953A0;
// 	// height: 31px;
// 	margin 0 5px;
// `;

// const FormLabel = styled.label`
// 	height: 31px;
// 	margin: auto;
// `;

// const UploadButton = styled.button`
// 	height: 31px;
// 	margin 0 5px;
// 	// background: #2953A0;
// 	border-radius: 4px;
// `;


const keyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [keyCodes.comma, keyCodes.enter];

export default class Upload extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// file: null,
			image: '',
			preview: '',
			tags: [],
			// suggestions: [
			//   {id: 'Nickname', text: 'Nickname'}
			// ]
		};

		// tag handlers
		// this.handleAddition = this.handleAddition.bind(this);
		// this.handleDelete = this.handleDelete.bind(this);
		// this.handleDrag = this.handleDrag.bind(this);

		// this.onChange = this.onChange.bind(this);
		// this.onSubmit = this.onSubmit.bind(this);
	}

	handleDelete = (i) => {
		const { tags } = this.state;
		this.setState({
			tags: tags.filter((tag, index) => index !== i),
		});
	}

	handleAddition = (tag) => {
		this.setState(state => ({ tags: [...state.tags, tag] }));
	}

	handleDrag = (tag, currPos, newPos) => {
		const tags = [...this.state.tags];
		const newTags = tags.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		this.setState({ tags: newTags });
	}

	onChange = e => {
		e.preventDefault();
		let reader = new FileReader();
		let image = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				image: image,
				preview: reader.result
			});
		}
		// const state = this.state;
		
		// switch (e.target.name) {
		// 	case 'file':
		// 		state.file = e.target.files[0];
		// 		break;
		// 	default:
		// 		state[e.target.name] = e.target.value;
		// }
		// this.setState(state);
		reader.readAsDataURL(image)
	};

	onSubmit = e => {
		e.preventDefault();
		const { tags, image } = this.state;
		console.log('Tags:', tags);

		let formData = new FormData();

		formData.append('tags', JSON.stringify(tags));
		// formData.append('tags', tags.map(i => i.text));
		formData.append('image', image);
		axios
			.post('/api/pictures/upload', formData)
			.then(res => {
				console.log('upload successful');
			})
			.catch(err => console.log('Must be logged in to upload photos.'));

		this.refs.image.value = '';
	};
	// Todo Resize for preview!
	render() {
		let { preview, tags } = this.state;
		let $preview = null;
		if (preview) { $preview = (<img src={preview} />)};

		return (
			<Container>
				<form onSubmit={this.onSubmit}>
					<input type="file" name="image" ref="image" onChange={this.onChange} />
					<ReactTags
						inline
						tags={tags}
						// suggestions={suggestions}
						handleDelete={this.handleDelete}
						handleAddition={this.handleAddition}
						handleDrag={this.handleDrag}
						delimiters={delimiters}
					/>
					<button type="submit" onClick={this.onSubmit}>Upload Image</button> 
				</form>
					<Image 
						src={preview}
						height={300}
						width={300}
					/>
				{/* <form onSubmit={this.onSubmit}>
					<Input class="custom" type="file" name="images" ref="images" onChange={this.onChange} />
					<ReactTags
						inline
						tags={tags}
						// suggestions={suggestions}
						handleDelete={this.handleDelete}
						handleAddition={this.handleAddition}
						handleDrag={this.handleDrag}
						delimiters={delimiters}
					/>
					<button class="upload-btn" type="submit">Upload</button>
				</form> */}
			</Container>
		);
	}
}

