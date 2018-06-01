import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class Upload extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      // ? change tags to an array 
      images: '',
      tags: '', 
    };
  }
  
  onChange = (e) => {
    const state = this.state;

    switch(e.target.name) {
      case 'images':
        state.images = e.target.files[0];
        break;
      default: 
        state[e.target.name] = e.target.value.split(',');
    }
    console.log(this.state.tags);
    
    this.setState(state);
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const { tags, images } = this.state;
    
    let formData = new FormData();
    
    formData.append('tags', tags);
    formData.append('images', images);
    axios.post('/api/users/upload', formData)
      .then((res) => {
      }).catch(err => console.log("Must be logged in to upload photos."));
    
    this.refs.tags.value = '';
    this.refs.images.value = '';
  }

  render() {
    const { tags, images } = this.state;
    return (
      // ? <h2>Upload success</h2> : <h1>Begin upload</h1>
      // Todo if user is not authenticated render a helpful message
      <form onSubmit={this.onSubmit}>
      <label>
        Upload:
        <input
          style={{ display: "flex"}}
          type="file"
          name="images"
          // add multiple to allow n number of uploads
          ref="images"
          onChange={this.onChange}
        />
      </label>
      <label>
        Tags:
        <input
          style={{ display: "flex"}}
          type="text"
          name="tags"
          value={tags}
          ref="tags"
          onChange={this.onChange}
        />
      </label>
        <button type="submit">Submit</button>
      </form> 
    )
  }
}
