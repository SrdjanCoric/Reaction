import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/BoardActions";
import BoardsDashboard from "./BoardsDashboard";

const mapStateToProps = state => {
  return {
    boards: state.boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBoards: () => {
      dispatch(actions.fetchBoards());
    }
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
          boards={this.props.boards}
          onNewBoardClick={this.handleNewBoardClick}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsDashboardContainer);
