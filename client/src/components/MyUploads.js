import React, { Component } from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class MyUploads extends Component {
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      uploads: [],
      imageId: ''
    };
  }

  onDelete = (e) => {
    console.log('btn click');
    console.log(e);
    axios.delete('http://localhost:5555/api/users/myuploads')
    .then(res => {
    })
  }
  
  componentDidMount() {
    axios.get('/api/users/myuploads')
    .then(res => {
      let uploads = res.data.uploads;
      console.log(res.data.uploads);
      this.setState({ uploads });
    })
  }
  // Todo Conditionally render message based on users status
  // Todo display tags
  // Todo add/remove/edit tags
  // Todo delete photo

  render() {
    return <div>
        <h1> My Uploads </h1>
        <ul>
					{this.state.uploads.map(img => (
						<li
							key={img._id}
							style={{ listStyleType: 'none', display: 'flex' }}
						>
							<img src={img.url} alt="myuploads" />
              <p>Tags:{img.tags}</p>
							<button onClick={() => this.onDelete(this.key)}>Delete upload</button>
            </li>
					))}
        </ul>
			</div>;
  }
}
