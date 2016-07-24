import React, { Component } from 'react';
import Immutable from 'immutable';
import Note from './note';
import NewNoteBar from './newNoteBar';
import { fetchNotes, pushNote, deleteNote, editNoteContents, editNotePosition } from '../firebase.js';

// var Immutable = require('immutable');
// example class based component (smart component)
class NoteBoard extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      notes: Immutable.Map({}),
      nextNoteId: 0,
      nextZIndex: 0,
    };

    this.updateNotes = this.updateNotes.bind(this);

    this.deleteNote = this.deleteNote.bind(this);
    this.editNoteContents = this.editNoteContents.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.changeNotePosition = this.changeNotePosition.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    fetchNotes(this.updateNotes, this.props.boardId);
  }

  updateNotes(snapshot) {
    this.setState({
      notes: Immutable.fromJS(snapshot.val()),
    });
  }

  deleteNote(id) {
    deleteNote(id, this.props.boardId);
  }

  editNoteContents(id, newContents, height, width) {
    editNoteContents(id, this.props.boardId, newContents, height, width);
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
      zIndex: this.state.zIndex + 1,
    });

    console.log(this.props.boardId);
    pushNote(newNote, this.props.boardId);
  }

  changeNotePosition(id, x, y) {
    // this.setState({
    //   notes: this.state.notes.update(id, (n) => {
    //     return Object.assign({}, n, { x, y, zIndex: this.state.nextZIndex });
    //   }),
    //   nextZIndex: this.state.nextZIndex + 1,
    // });
    editNotePosition(id, this.props.boardId, x, y);
  }

  render() {
    let notes;
    if (this.state.notes) {
      notes = this.state.notes.entrySeq().map(([id, note]) => {
        return (
          <Note note={note} id={id} deleteNote={this.deleteNote} editNote={this.editNoteContents} key={id} onPositionChange={this.changeNotePosition} />
        );
      }).toArray();
    }
    return (
      <div>
        <div className="close-note-board-button" onClick={this.props.exitNoteboard}>
          <span>Back to Dashboard</span>
        </div>
        <NewNoteBar createNewNote={this.createNewNote} />
        {notes}
      </div>
    );
  }
}

export default NoteBoard;
