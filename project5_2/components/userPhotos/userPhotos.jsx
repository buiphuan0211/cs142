import React from 'react';
import { Typography } from '@material-ui/core';
import './userPhotos.css';
import { Link } from 'react-router-dom';

/**
 * Define UserPhotos, a React componment of CS142 project #5
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    // let photos;
    this.state = {
      photoList: [],
      userId: this.props.match.params.userId || 0,
    };
  }

  componentDidMount = () => {
    console.log('>> Component Did Mount');
    fetch(`http://localhost:3000/photosOfUser/${this.state.userId}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            photoList: result,
          });
        },
        (error) => {
          console.log('BUG CALL API');
        }
      );
  };

  componentDidUpdate = () => {
    let newUserID = this.props.match.params.userId;
    if (this.state.userId !== newUserID) {
      fetch(`http://localhost:3000/photosOfUser/${newUserID}`)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              userId: newUserID,
              photoList: result,
            });
          },
          (error) => {
            console.log('BUG CALL API');
          }
        );
    }
  };

  render() {
    return (
      <Typography variant='body1'>
        <Typography variant='caption'>
          <span style={{ fontSize: '30px' }}>
            Photo của thèn{' '}
            <span style={{ color: 'green' }}>
              {' '}
              {window.cs142models.userModel(this.state.userId).first_name}
            </span>{' '}
            được click bên trái nè..
          </span>

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
                          to={`/users/${comment.user._id}`}
                          style={{ fontWeight: 'bold' }}
                        >
                          {` Comment: ${photo.comments.indexOf(comment) + 1}`}{' '}
                        </Link>
                        <ul>
                          <li>{`Comment_id: ${comment._id}`}</li>
                          <li>{`Comment_dateTime: ${comment.date_time}`}</li>
                          <li>{`Comment_content: ${comment.comment}`}</li>
                          <li>{`Comment_user: ${comment.user._id}`}</li>
                          <li>{`Comment_Photo_id: ${comment.photo_id}`}</li>
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
