import React from "react";
import BoardTile from "./BoardTile";
import CreateBoardTile from "./CreateBoardTile";

const BoardsDashboard = props => {
  let boards = props.boards.map(board => (
    <BoardTile title={board.title} id={board.id} key={board.id} />
  ));

  return (
    <main className="dashboard">
      <section className="board-group">
        <header>
          <div className="board-section-logo">
            <span className="person-logo"></span>
          </div>
          <h2>Personal Boards</h2>
        </header>

        <ul className="dashboard-board-tiles">
          {boards}
          <CreateBoardTile onClick={props.onNewBoardClick} />
        </ul>
      </section>
    </main>
  );
};

export default BoardsDashboard;
