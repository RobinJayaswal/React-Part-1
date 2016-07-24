import React from 'react';

class NewBoardBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.createNewBoard = this.createNewBoard.bind(this);
  }

  onInputChange(ev) {
    this.setState({
      value: ev.target.value,
    });
  }

  createNewBoard() {
    this.props.createNewBoard(this.state.value);
  }

  render() {
    return (
      <div id="new-note-bar">
        <input value={this.state.value} onChange={this.onInputChange} placeholder="Create a new noteboard!" />
        <div onClick={this.createNewBoard}>
          <span>Create</span>
        </div>
      </div>
    );
  }
}

export default NewBoardBar;
