import React from "react";
import { connect } from "react-redux";
import CreateBoardTileForm from "./CreateBoardTileForm";
import * as actions from "../../actions/BoardActions";

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (newBoard, callback) => {
      dispatch(actions.createBoard(newBoard));
      callback();
    }
  };
};

class CreateBoardTileFormContainer extends React.Component {
  state = {
    title: ""
  };

  handleTextChange = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const newBoard = { title: this.state.title };

    this.props.onSubmit(newBoard, () => {
      this.setState({
        title: ""
      });
      this.props.onSave();
    });
  };

  render() {
    return (
      <CreateBoardTileForm
        onCloseClick={this.props.onCloseClick}
        onTextChange={this.handleTextChange}
        onSubmit={this.handleSubmit}
        title={this.state.title}
      />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CreateBoardTileFormContainer);
