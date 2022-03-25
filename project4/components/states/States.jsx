import React from 'react';
import './States.css';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */
class States extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: window.cs142models.statesModel(),
    };
  }
  render() {
    console.log(this.state.listItem);
    return (
      <div>
        <h2>Replace this with the code for CS142 Project #4, Problem #2</h2>
        <div>
          <ul>
            {this.state.listItem.map((item) => (
              <li key={this.state.listItem.indexOf(item)}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default States;
