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
  componentDidMount() {
    this.props.onFetchBoards();
  }

  render() {
    return (
      <div>
        <BoardsDashboard boards={this.props.boards} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsDashboardContainer);
