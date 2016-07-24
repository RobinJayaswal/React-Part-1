import React from 'react';


function renderBoardThumb(title, key, openBoardCallback) {
  return (
    <div className="board-thumb-container" key={key} onClick={() => { this.openBoardCallback(key); }}>
      <span>{title}</span>
    </div>
  );
}

export default renderBoardThumb;
