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

  // Todo display tags
  // Todo add/remove/edit tags
  // Todo delete photo

  render() {
    return (
      <div>
        <h1> My Uploads </h1>
        <ul>
          {this.state.uploads.map(img =>
          // need to incorporate image tags from backend
          // each upload should = { url: <link>, tags: [tags] }
            <li style={{listStyleType: "none", display: "flex"}}>
              <img 
                src={img} 
                alt="myuploads"
              />
            </li>
          )}
        </ul>
      </div>
    )
  }
}
