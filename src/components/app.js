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
    };

    this.deleteNote = this.deleteNote.bind(this);
    this.editNoteContents = this.editNoteContents.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
  }

  componentWillMount() {
    const note1 = {
      title: 'Title!',
      text: 'Here is my text dere dere dere',
      x: 0,
      y: 0,
      zIndex: 0,
    };
    this.setState({
      notes: this.state.notes.set('one', note1),
    });
  }

  deleteNote(id) {
    this.setState({
      notes: this.state.notes.delete(id),
    });
  }

  editNoteContents(id, newContents) {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, { text: newContents }); }),
    });
  }

  createNewNote(title) {
    const newNote = {
      title,
      text: '',
      x: 0,
      y: 0,
      zIndex: 0,
    };
    this.setState({
      notes: this.state.notes.set(this.state.nextNoteId, newNote),
      nextNoteId: this.state.nextNoteId += 1,
    });
  }

  render() {
    return (
      <div>
        <NewNoteBar createNewNote={this.createNewNote} />
        {this.state.notes.entrySeq().map(([id, note]) => {
          return (
            <Note note={note} id={id} deleteNote={this.deleteNote} editNote={this.editNoteContents} key={id} />
          );
        })}
      </div>
    );
  }
}

export default App;
