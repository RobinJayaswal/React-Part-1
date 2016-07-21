import React from 'react';
import Draggable from 'react-draggable';
import Marked from 'marked';
import Modal from 'react-modal';

// example inputs;
// ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      contents: this.props.note.text,
      showImageModal: false,
      imageURLValue: '',
    };
    this.submitEdit = this.onSubmitEdit.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);
    this.onContentsChange = this.onContentsChange.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.insertImage = this.insertImage.bind(this);
    this.onToggleImageModal = this.onToggleImageModal.bind(this);
    this.onImageURLChange = this.onImageURLChange.bind(this);
    this.onInsertImage = this.onInsertImage.bind(this);
  }


  onContentsChange(ev) {
    this.setState({
      contents: ev.target.value,
    });
  }
  onToggleImageModal() {
    this.setState({
      showImageModal: !this.state.showImageModal,
    });
  }
  onSubmitEdit() {
    this.props.editNote(this.props.id, this.state.contents, this.noteContainer.offsetHeight, this.noteContainer.offsetWidth);
    this.setState({
      isEditing: false,
    });

    // set a timer to rerender the height of the note if the contents got longer than
    // the note itself.
    setTimeout(setTimeout(() => { this.recalibrateSize(); }), 100);
  }

  onImageURLChange(ev) {
    this.setState({
      imageURLValue: ev.target.value,
    });
  }

  onInsertImage() {
    const imageMarkdown = `![alt text](${this.state.imageURLValue})`;
    this.setState({
      contents: `${this.state.contents} ${imageMarkdown}`,
      showImageModal: false,
    });
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

  insertImage() {
    console.log(this.noteEditBox.innerHTML);
    this.setState({
      contents: this.state.contents + 'added',
    });
    // dom('editing-area').value = dom('editing-area').value.substring(0, start)
    //       + 'hello'
    //       + dom('editing-area').value.substring(endPos, dom('editing-area').value.length);
  }

  // eventLogger = (e: MouseEvent, data: Object) => {
  //   console.log('Event: ', event);
  //   console.log('Data: ', data);
  // };

  createMarkup() {
    return { __html: Marked(this.props.note.text) };
  }

  render() {
    let mainContents, editButton, noteStyles;

    if (this.state.isEditing) {
      mainContents = (
        <textarea
          ref={(ref) => { this.noteEditBox = ref; }}
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
        zIndex: this.props.note.zIndex,
      };
    }

    let modalStyle = {
      content: {
        top: '40%', bottom: '40%', left: '30%', right: '30%',
        backgroundColor: 'rgba(0, 0, 0, .8)',
        color: 'white',
        boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.2)' },
      overlay: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
      position: 'relative',
    };

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
          <Modal isOpen={this.state.showImageModal} style={modalStyle}>
            <div id="image-modal-container">
              <span>Insert Image Url Below (Just the URL!)</span>
              <input value={this.state.imageURLValue} onChange={this.onImageURLChange} />
              <div className="buttons-container">
                <div className="cancel modal-button" onClick={this.onToggleImageModal}><div>Cancel</div></div>
                <div className="insert modal-button" onClick={this.onInsertImage}><div>Insert</div></div>
              </div>
            </div>
          </Modal>
          <div className="top-bar" ref={(ref) => { this.topBar = ref; }}>
            <div className="left-top">
              <span>{this.props.note.title}</span>
              <div onClick={this.deleteSelf}><span className="fa fa-trash-o"></span></div>
              {editButton}
              <div onClick={this.onToggleImageModal}><span className="fa fa-image"></span></div>
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
