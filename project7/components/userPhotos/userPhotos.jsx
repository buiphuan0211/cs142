import React from 'react';
import { Typography } from '@material-ui/core';
import './userPhotos.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
/**
 * Define UserPhotos, a React componment of CS142 project #5
 */

class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoList: [],
      comment: {},
      userId: this.props.match.params.userId || 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    e.preventDefault();
    const target = e.target;
    this.setState({
      comment: { ...this.state.comment, [target.name]: target.value },
    });
  }

  handleSubmit(e, photoId) {
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

    axios
      .get(`http://localhost:3000/photosOfUser/${this.state.userId}`)
      .then((res) => {
        const result = res.data;
        this.setState({ photoList: result.data.photos });
      });

    this.setState({
      comment: { ...this.state.comment, [`comment${photoId}`]: '' },
    });
  }

  componentDidMount = () => {
    // console.log('>> Component Did Mount');
    axios
      .get(`http://localhost:3000/photosOfUser/${this.state.userId}`)
      .then((res) => {
        const result = res.data;
        console.log(result);
        this.setState({ photoList: result.data.photos });
      });
  };

  render() {
    return (
      <Typography variant='body1'>
        <Typography variant='caption'>
          {this.state.photoList.length > 0 &&
            this.state.photoList.map((photo) => (
              <div key={photo._id}>
                <img
                  src={photo.file_name}
                  style={{ width: '20rem', height: '15rem' }}
                />
                <form onSubmit={(e) => this.handleSubmit(e, photo._id)}>
                  <label>
                    New comment:
                    <input
                      type='text'
                      name={`comment${photo._id}`}
                      value={this.state.comment[`comment${photo._id}`]}
                      onChange={this.handleInputChange}
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
        </Typography>
      </Typography>
    );
  }
}

export default UserPhotos;
