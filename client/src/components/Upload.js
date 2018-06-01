import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class Upload extends Component {
  constructor() {
    super();
    this.state = {
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
        state[e.target.name] = e.target.value;
    }

    this.setState(state);
  }
  
  onSubmit = (e) => {
    e.preventDefault();
    const { tags, images } = this.state;
    
    let formData = new FormData();
    
    formData.append('tags', tags.split(' '));
    formData.append('images', images);
    
    console.log(formData);
    console.log(formData.tags);
    axios.post('/api/users/upload', formData)
      .then((res) => {
        console.log(res.data);        
      }).catch(err => console.log(err));
  }

  render() {
    const { tags, images } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="tags"
          value={tags}
          onChange={this.onChange}
        />
        <input
          type="file"
          name="images"
          onChange={this.onChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
