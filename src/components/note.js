import React from 'react';
import Draggable from 'react-draggable';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      contents: this.props.note.text,
    };
    this.submitEdit = this.submitEdit.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);
    this.onContentsChange = this.onContentsChange.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  onContentsChange(ev) {
    this.setState({
      contents: ev.target.value,
    });
  }

  toggleEditMode() {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  submitEdit() {
    this.props.editNote(this.props.id, this.state.contents);
    this.setState({
      isEditing: false,
    });
  }

  deleteSelf() {
    this.props.deleteNote(this.props.id);
  }

  render() {
    let mainContents, editButton;
    if (this.state.isEditing) {
      mainContents = (
        <textarea
          value={this.state.contents}
          onChange={this.onContentsChange}
        />
      );
      editButton = (
        <div onClick={this.submitEdit}><span className="fa fa-check"></span></div>
      );
    } else {
      mainContents = (
        <span>{this.props.note.text}</span>
      );
      editButton = (
        <div onClick={this.toggleEditMode}><span className="fa fa-edit"></span></div>
      );
    }


    return (
      <Draggable
        handle=".note-mover"
        grid={[25, 25]}
        defaultPosition={{ x: 20, y: 20 }}
        position={{ x: this.props.note.x, y: this.props.note.y }}
        onStart={this.onStartDrag}
        onDrag={this.onDrag}
        onStop={this.onStopDrag}
      >
        <div id="note">

          <div className="top-bar">
            <div className="left-top">
              <p>{this.props.note.title}</p>
              <div onClick={this.deleteSelf}><span className="fa fa-trash-o"></span></div>
              {editButton}
            </div>
            <div className=".note-mover" onClick={this.setEditMode}><span className="fa fa-arrows-alt"></span></div>
          </div>

          <div className="main-contents">
            {mainContents}
          </div>

        </div>
      </Draggable>
    );
  }
}

export default Note;
