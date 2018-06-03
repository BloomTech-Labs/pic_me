import React, { Component } from 'react'
import axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-input';

axios.defaults.withCredentials = true;

export default class MyUploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
    };
  }
  
  componentDidMount() {
    axios.get('/api/users/myuploads')
    .then(res => {
      let uploads = res.data.uploads;
      console.log(res.data.uploads);
      this.setState({ uploads });
    })
  }

  handleDelete = (key) => {
    console.log(key);
    const prevState = this.state;
    console.log(this.state);
    // this.setState(prevState => ({
    //   uploads: prevState.uploads.filter(upload => upload.key !== key)
    // }));
    // this.setState()
    console.log('btn click');
    
    axios.delete(`/api/users/myuploads/${this.state.id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }
  
  // Todo Conditionally render message based on users status
  // Todo display tags
  // Todo add/remove/edit tags
  // Todo delete photo
  render() {
    return <div>
        <h1> My Uploads </h1>
          {
    this.state.uploads.map(img => (
      <li key={img._id}>
        {/* style={{ listStyleType: 'none', display: 'flex' }}> */}
        <img src={img.url} alt="myuploads" />
        {img.tags.map(t => (<p>{t}</p>))}
        <button type="submit" onClick={e => this.handleDelete(img._id)}>Delete upload</button>
      </li>
    ))}
      </div>
  }
}
