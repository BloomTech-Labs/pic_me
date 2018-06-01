import React, { Component } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class MyUploads extends Component {
  constructor() {
    super();
    this.state = {
      uploads: []
    };
  }

  componentDidMount() {
    axios.get('/api/users/myuploads')
      .then(res => {
        let uploads = res.data.uploads;
        // console.log(res.data);
        this.setState({ uploads });
      })
      // console.log(this.state);
  }

  render() {
    return (
      <div>
        <h1> My Uploads </h1>
        <ul>
          {this.state.uploads.map(img => 
            <li><img src={img} alt="myuploads"/></li>
          )}
        </ul>
      </div>
    )
  }
}
