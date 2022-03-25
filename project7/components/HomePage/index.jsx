import { TextareaAutosize, Typography } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      photos: [],
      comment: {},
      image: '',
    };
    this.handleChangeUpload = this.handleChangeUpload.bind(this);
    this.handleSubmitUpload = this.handleSubmitUpload.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleInputCommentChange = this.handleInputCommentChange.bind(this);
  }

  componentDidMount = () => {
    // console.log('>> Component Did Mount');
    axios.get(`http://localhost:3000/photos`).then((res) => {
      const result = res.data;

      this.setState({ photos: result.data.photos });
      console.log('data before upload', this.state.photos);
    });
  };

  handleChangeUpload(e) {
    console.log(e.target.files[0]);
    e.preventDefault();
    this.setState({ image: e.target.files[0] });
  }

  handleSubmitUpload(e) {
    e.preventDefault();

    var formData = new FormData();
    formData.append('image', this.state.image);
    formData.append('user_id', this.state.user._id);

    // Insert photo of user to DB
    axios.post('http://localhost:3000/photos/new', formData, {}).then((res) => {
      // call list photos
      axios.get(`http://localhost:3000/photos`).then((res) => {
        const result = res.data;
        this.setState({ photos: result.data.photos });
        console.log('data alter upload', this.state.photos);
      });
    });

    this.setState({ image: '' });
  }
  handleInputCommentChange(e) {
    e.preventDefault();
    const target = e.target;
    this.setState({
      comment: { ...this.state.comment, [target.name]: target.value },
    });
  }

  handleSubmitComment(e, photoId) {
    e.preventDefault();

    axios
      .post(`http://localhost:3000/commentsOfPhoto/${photoId}`, {
        dataComment: {
          userId: JSON.parse(localStorage.getItem('user'))._id,
          comment: this.state.comment[`comment${photoId}`],
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response));

    axios.get(`http://localhost:3000/photos`).then((res) => {
      const result = res.data;
      this.setState({ photos: result.data.photos });
    });

    this.setState({
      comment: { ...this.state.comment, [`comment${photoId}`]: '' },
    });
  }

  render() {
    return (
      <div>
        <h1>HomePage</h1>
        <hr />
        <h2>Đăng bài</h2>
        <form onSubmit={this.handleSubmitUpload}>
          {/* {selectedFile && <img src={preview} />} */}
          <input type='file' name='image' onChange={this.handleChangeUpload} />

          {this.state.image && (
            <div>
              <img
                src={URL.createObjectURL(this.state.image)}
                alt='Thumb'
                style={{ width: '500px', height: '300px' }}
              />
            </div>
          )}
          <input type='submit' value='Đăng bài' />
        </form>

        <h2>Photo</h2>
        {this.state.photos.length > 0 &&
          this.state.photos.map((photo) => (
            <div key={photo._id}>
              <img
                src={photo.file_name}
                style={{
                  width: '20rem',
                  height: '15rem',
                  backgroundPosition: 'center',
                }}
              />
              <form onSubmit={(e) => this.handleSubmitComment(e, photo._id)}>
                <label>
                  New comment:
                  <input
                    type='text'
                    name={`comment${photo._id}`}
                    value={this.state.comment[`comment${photo._id}`]}
                    onChange={this.handleInputCommentChange}
                  />
                </label>
                <button type='submit'>Submit</button>
              </form>

              <ul>
                <li>{`ID: ${photo._id}`}</li>
                <li>{`DateTime: ${photo.date_time}`}</li>
                <li>{`FileName: ${photo.file_name}`}</li>
                <li>{`UserID: ${photo.user_id}`}</li>
                <li>
                  {' '}
                  Comment
                  {photo?.comments?.map((comment) => (
                    <div key={comment._id}>
                      <Link
                        to={`/users/${comment.user_id}`}
                        style={{ fontWeight: 'bold' }}
                      >
                        {` Comment: ${photo.comments.indexOf(comment) + 1}`}{' '}
                      </Link>
                      <ul>
                        <li>{`id: ${comment._id}`}</li>
                        <li>{`dateTime: ${comment.date_time}`}</li>
                        <li>{`content: ${comment.comment}`}</li>
                        <li>{`user_id: ${comment.user_id}`}</li>
                        {/* <li>{`Comment_Photo_id: ${comment.photo_id}`}</li> */}
                      </ul>
                    </div>
                  ))}
                </li>
              </ul>
            </div>
          ))}
      </div>
    );
  }
}

export default HomePage;
