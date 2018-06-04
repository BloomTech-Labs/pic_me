import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button, Input, InputLabel } from '@material-ui/core';
import FileUpload from '@material-ui/icons/FileUpload';
import axios from 'axios';
import './Upload.css';

axios.defaults.withCredentials = true;

export default class Upload extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      images: '',
      tags: ''
    };
  }

  onChange = e => {
    const state = this.state;

    switch (e.target.name) {
      case 'images':
        state.images = e.target.files[0];
        break;
      default:
        state[e.target.name] = e.target.value;
    }

    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    const { tags, images } = this.state;

    let formData = new FormData();

    formData.append('tags', tags);
    formData.append('images', images);

    console.log(formData);
    console.log(formData.tags);
    axios
      .post("/api/users/upload", formData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { tags, images } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="content">
          <div className="box">
            <div>
              <Input
                type="file"
                id="file"
                name="images"
                className="inputfile"
                onChange={this.onChange}
              />
              <label htmlFor="file">Select a file</label>
            </div>
          </div>
          <div>
            <InputLabel>Tags</InputLabel>
            <Input
              label="Tags"
              type="text"
              name="tags"
              value={tags}
              onChange={this.onChange}
            />
          </div>

          <div>
            <Button variant="raised" color="primary" type="submit">
              Upload
              <FileUpload />
            </Button>
          </div>
        </div>
      </form>
    );
  }
}
