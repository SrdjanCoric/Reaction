import React from "react";

const CreateBoardTileForm = props => (
  <section className="new-board-form">
    <header>
      <span>Create Board</span>
      <a
        href="#"
        className="icon-sm icon-close"
        onClick={props.onCloseClick}
      ></a>
    </header>
    <form onSubmit={props.onSubmit}>
      <dl>
        <dt>Title</dt>
        <dd>
          <input
            type="text"
            placeholder='Like "Publishing Calendar"...'
            value={props.title}
            onChange={props.onTextChange}
          />
        </dd>
      </dl>
      <button type="submit">Create</button>
    </form>
  </section>
);

export default CreateBoardTileForm;
