import React from 'react';
import Example from '../example/Example';
import States from '../states/States';

const STATE = 'stateView';
const EXAMPLE = 'exampleView';
class PageChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewPage: EXAMPLE,
    };
  }

  handlePageChange = () => {
    const page = this.state.viewPage === EXAMPLE ? STATE : EXAMPLE;
    this.setState({ viewPage: page });
  };

  render() {
    return (
      <div>
        <button onClick={this.handlePageChange}>
          {` Chuyển đến trang ${
            this.state.viewPage === EXAMPLE ? STATE : EXAMPLE
          } `}
        </button>
        <div>{this.state.viewPage === EXAMPLE ? <Example /> : <States />}</div>
      </div>
    );
  }
}
export default PageChange;
