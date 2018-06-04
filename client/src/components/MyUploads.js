import React, { Component } from 'react'
import axios from 'axios';
// import { WithContext as ReactTags } from 'react-tag-input';
// import Upload from './Upload';
axios.defaults.withCredentials = true;

// const keyCodes = {
// 	comma: 188,
// 	enter: 13
// };

// const delimiters = [keyCodes.comma, keyCodes.enter];

export default class MyUploads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      // tags: [
      //   { id: '1', text: 'Pic Me' }
      // ],
      // suggestions: [
      //   { id: 'Nickname', text: 'Nickname' }
      // ],
    };

    // this.handleAddition = this.handleAddition.bind(this);
    // this.handleTagDelete = this.handleTagDelete.bind(this);
    // this.handleDrag = this.handleDrag.bind(this);
  }

  // handleTagDelete(i) {
  //   const { tags } = this.state;
  //   this.setState({
  //     tags: tags.filter((tag, index) => index !== i),
  //   });
  // }

  // handleAddition(tag) {
  //   this.setState(state => ({ tags: [...state.tags, tag] }));
  // }

  // handleDrag(tag, currPos, newPos) {
  //   const tags = [...this.state.tags];
  //   const newTags = tags.slice();

  //   newTags.splice(currPos, 1);
  //   newTags.splice(newPos, 0, tag);

  //   this.setState({ tags: newTags });
  // }
  
  componentDidMount() {
    axios.get('/api/picture/myuploads')
    .then(res => {
      let uploads = res.data.uploads;
      let tags = res.data.uploads.tags;
      // let suggestions = res.data.suggestions;
      console.log(res.data.uploads);
      // console.log(tags);
      this.setState({ uploads, tags });
    })
  }

  // refactor handler use better naming
  handleDelete = (key) => {
    // key now pointing to correct img._id for deletion
    // just need to fix backend controllers and photo 
    // deletion will be hooked up properly.
    console.log(key);
    // const prevState = this.state;
    // console.log(this.state);
    this.setState(prevState => ({
      uploads: prevState.uploads.filter(upload => upload._id !== key)
    }));
    
    console.log('btn click');
    
    // axios.delete(`/api/users/myuploads/${key}`)
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
    // })
  }
  
  // Todo Conditionally render message based on users status
  // Todo display tags
  // Todo add/remove/edit tags
  // Todo delete photo
  // Todo sort photos by createdAt (shows most recent uploads first)

  render() {
    return <div>
        <h1> My Uploads </h1>
          {
    this.state.uploads.map(img => (
      <li key={img._id}>
        {/* style={{ listStyleType: 'none', display: 'flex' }}> */}
        <img src={img.url} alt="myuploads" />
        {img.tags.map(t => (<p>{t.text}</p>))}
            {/* <ReactTags tags={img.tags}
              suggestions={this.suggestions}
              handleDelete={this.handleDelete}
              handleAddition={img.handleAddition}
              handleDrag={this.handleDrag}
              delimiters={this.state.delimiters} /> */}
        <button type="submit" onClick={e => this.handleDelete(img._id)}>Delete upload</button>
      </li>
    ))}
      </div>
  }
}
