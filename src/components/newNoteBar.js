import React from 'react';

class NewNoteBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
  }

  onInputChange(ev) {
    this.setState({
      value: ev.target.value,
    });
  }

  createNewNote() {
    this.props.createNewNote(this.state.value);
  }

  render() {
    return (
      <div id="new-note-bar">
        <input value={this.state.value} onChange={this.onInputChange} placeholder="Enter new title here" />
        <div onClick={this.createNewNote}>
          <span>Submit</span>
        </div>
      </div>
    );
  }
}

export default NewNoteBar;
