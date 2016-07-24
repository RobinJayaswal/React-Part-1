import React, { Component } from 'react';
import Dashboard from './dashboard';
import NoteBoard from './noteBoard';

// var Immutable = require('immutable');
// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openNoteboardKey: null,
    };

    this.openNoteboard = this.openNoteboard.bind(this);
    this.exitNoteboard = this.exitNoteboard.bind(this);
  }

  openNoteboard(key) {
    this.setState({
      openNoteboardKey: key,
    });
  }

  exitNoteboard() {
    this.setState({
      openNoteboardKey: null,
    });
  }

  // app will hold state of whether it is at dashboard or viewing specific note board
  render() {
    if (!this.state.openNoteboardKey) {
      return (
        <Dashboard openNoteboard={this.openNoteboard} />
      );
    } else {
      console.log(this.state.openNoteboardKey);
      return (
        <NoteBoard key={this.state.openNoteboardKey} boardId={this.state.openNoteboardKey} exitNoteboard={this.exitNoteboard} />
      );
    }
  }
}

export default App;
