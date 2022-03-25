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
      userId: this.props.match.params.userId || 0,
      userName: '',
    };
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

  componentDidUpdate = () => {
    // console.log('>> Component Did Update');
    let newUserID = this.props.match.params.userId;
    if (this.state.userId !== newUserID) {
      axios
        .get(`http://localhost:3000/photosOfUser/${newUserID}`)
        .then((res) => {
          const result = res.data;
          console.log(result.data.user);
          this.setState({ photoList: result.data.photos, userId: newUserID });
        });
    }
  };

  render() {
    return (
      <Typography variant='body1'>
        <Typography variant='caption'>
          {this.state.photoList.length > 0 &&
            this.state.photoList.map((photo) => (
              <div key={photo._id}>
                <img
                  src={`../../images/${photo.file_name}`}
                  style={{ width: '20rem', height: '15rem' }}
                />
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
                          <li>{`Comment_id: ${comment._id}`}</li>
                          <li>{`Comment_dateTime: ${comment.date_time}`}</li>
                          <li>{`Comment_content: ${comment.comment}`}</li>
                          <li>{`Comment_user: ${comment.user_id}`}</li>
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
