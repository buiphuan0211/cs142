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

  componentDidUpdate = () => {
    let newUserID = this.props.match.params.userId;
    if (this.state.userId !== newUserID) {
      let fetchPhoto = window.cs142models.photoOfUserModel(newUserID);
      this.setState({
        userId: newUserID,
        photoList: fetchPhoto,
      });
    }
  };

  render() {
    console.log(this.state.photoList);
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
              <ul key={photo._id}>
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
            ))}
        </Typography>
      </Typography>
    );
  }
}

export default UserPhotos;
