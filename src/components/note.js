import React from 'react';
import Draggable from 'react-draggable';
import Marked from 'marked';

// example inputs;
// ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
// asldfjaskdfjalsdfjlasjdfl;ajsdljalskdjflasjdlfjalsdkjflaskjdlfajsdlfkjasldjflajflsdjlakjsdlkajslfjlaskjflaksjdlfkajsdlfkjalsdjflasjdflasdjlfasdjfksadjflasjdlfajsdlkfjasldjflasdkjflasdjlfkajsdlfjlasdlfjlkj

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      contents: this.props.note.text,
    };
    this.submitEdit = this.onSubmitEdit.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);
    this.onContentsChange = this.onContentsChange.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  onContentsChange(ev) {
    this.setState({
      contents: ev.target.value,
    });
  }


  onSubmitEdit() {
    console.log(this.noteContainer.offsetHeight);
    console.log(this.noteContainer.offsetWidth);

    // set a timer to rerender the height of the note if the contents got longer than
    // the note itself.

    this.props.editNote(this.props.id, this.state.contents, this.noteContainer.offsetHeight, this.noteContainer.offsetWidth);
    this.setState({
      isEditing: false,
    });
    setTimeout(setTimeout(() => { this.recalibrateSize(); }), 100);
  }

  recalibrateSize() {
    const height = Math.max(this.noteContainer.offsetHeight, this.noteContentsContainer.offsetHeight + this.topBar.offsetHeight + 30);
    const width = Math.max(this.noteContainer.offsetWidth, this.noteContentsContainer.offsetWidth + 20);
    if (height !== this.noteContainer.offsetHeight || width !== this.noteContainer.offsetWidth) {
      this.props.editNote(this.props.id, this.props.note.text, height, width);
    }
  }

  toggleEditMode() {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  deleteSelf() {
    this.props.deleteNote(this.props.id);
  }

  handleDrag(e, ui) {
    this.props.onPositionChange(this.props.id, ui.x, ui.y);
  }

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', event);
    console.log('Data: ', data);
  };

  createMarkup() {
    return { __html: Marked(this.props.note.text) };
  }

  render() {
    let mainContents, editButton, noteStyles;
    console.log('offset before anything' + (this.noteContentsContainer ? this.noteContentsContainer.offsetHeight : ''));

    if (this.state.isEditing) {
      mainContents = (
        <textarea
          value={this.state.contents}
          onChange={this.onContentsChange}
          style={{ height: this.props.note.height - 50, width: this.props.note.width - 25 }}
        />
      );
      editButton = (
        <div onClick={this.submitEdit}><span className="fa fa-check"></span></div>
      );
    } else {
      mainContents = (
        <div className="note-body" dangerouslySetInnerHTML={this.createMarkup()} ref={(ref) => { this.noteContentsContainer = ref; }}></div>
      );
      editButton = (
        <div onClick={this.toggleEditMode}><span className="fa fa-edit"></span></div>
      );
    }

    if (!this.state.isEditing) {
      noteStyles = {
        height: this.props.note.height,
        width: this.props.note.width,
      };
    }

    return (
      <Draggable
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[2, 2]}
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
      >
        <div id="note" ref={(ref) => { this.noteContainer = ref; }} style={noteStyles}>

          <div className="top-bar" ref={(ref) => { this.topBar = ref; }}>
            <div className="left-top">
              <span>{this.props.note.title}</span>
              <div onClick={this.deleteSelf}><span className="fa fa-trash-o"></span></div>
              {editButton}
            </div>
            <div className="handle"><span className="fa fa-arrows-alt"></span></div>
          </div>

          <div className="main-contents" >
            {mainContents}
          </div>

        </div>
      </Draggable>
    );
  }

}

export default Note;
