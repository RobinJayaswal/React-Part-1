import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import NewNoteBar from './newNoteBar';

// var Immutable = require('immutable');
// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map({}),
      nextNoteId: 0,
      nextZIndex: 0,
    };

    this.deleteNote = this.deleteNote.bind(this);
    this.editNoteContents = this.editNoteContents.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.changeNotePosition = this.changeNotePosition.bind(this);
  }

  componentWillMount() {
    this.createNewNote('Title!');
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  editNoteContents(id, newContents, height, width) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text: newContents, height, width }); }),
    });
  }

  createNewNote(title) {
    const newNote = {
      title,
      text: '',
      x: 0,
      y: 0,
      height: 300,
      width: 200,
      zIndex: this.state.nextZIndex,
    };
    this.setState({
      notes: this.state.notes.set(this.state.nextNoteId, newNote),
      nextNoteId: this.state.nextNoteId + 1,
      nextZIndex: this.state.nextZIndex + 1,
    });
  }

  changeNotePosition(id, x, y) {
    this.setState({
      notes: this.state.notes.update(id, (n) => {
        return Object.assign({}, n, { x, y, zIndex: this.state.nextZIndex });
      }),
      nextZIndex: this.state.nextZIndex + 1,
    });
  }

  render() {
    return (
      <div>
        <NewNoteBar createNewNote={this.createNewNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note note={note} id={id} deleteNote={this.deleteNote} editNote={this.editNoteContents} key={id} onPositionChange={this.changeNotePosition} />
          );
        })}
      </div>
    );
  }
}

export default App;
