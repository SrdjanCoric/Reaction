import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    boards: state.boards
  };
};

class BoardsDashboardContainer extends React.Component {
  state = {
    popover: {
      visible: false,
      attachedTo: null,
      type: null
    }
  };
  handleNewBoardClick = e => {
    this.setState({
      popover: {
        visible: true,
        attachedTo: e.currentTarget,
        type: "new-board"
      }
    });
  };
  render() {
    return (
      <div>
        <BoardsDashboard
          boards={props.boards}
          onNewBoardClick={this.handleNewBoardClick}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(BoardsDashboardContainer);
