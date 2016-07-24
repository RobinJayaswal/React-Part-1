import React from 'react';
import NoteBoard from './noteBoard';
import NewBoardBar from './newBoardBar';
import Immutable from 'immutable';
import { fetchNoteBoards, pushNoteBoard } from '../firebase';
import renderBoardThumb from './boardThumb';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: Immutable.Map({}),
    };

    this.updateNoteBoards = this.updateNoteBoards.bind(this);
    this.addNewBoard = this.addNewBoard.bind(this);
  }

  componentDidMount() {
    fetchNoteBoards(this.updateNoteBoards);
  }

  updateNoteBoards(snapshot) {
    this.setState({
      boards: Immutable.fromJS(snapshot.val()),
    });
  }

  addNewBoard(title) {
    const board = {
      title,
    };

    pushNoteBoard(board);
  }

  render() {
    let boards = [];
    console.log(this.state.boards);
    if (this.state.boards) {
      boards = this.state.boards.entrySeq().map(([id, board]) => {
        return (
          <div className="board-thumb-container" key={id} onClick={() => { this.props.openNoteboard(id); }}>
            <span>{board.get('title')}</span>
          </div>
        );
      }).toArray();
    }


    console.log(boards);
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <NewBoardBar createNewBoard={this.addNewBoard} />
        <p>Click a noteboard or create a new one</p>
        <div className="boards-container">

          {boards}

        </div>
      </div>
    );
  }
}

export default Dashboard;
