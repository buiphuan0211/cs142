import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: 'blue',
        }}
      >
        <h1>{this.state.title}</h1>
      </div>
    );
  }
}
export default Header;
