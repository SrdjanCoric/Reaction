import BoardTile from "./BoardTile";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("BoardTile", () => {
  const board = {
    title: "Web Development",
    id: 1
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BoardTile title={board.title} id={board.id} />);
  });
  it("renders the board title", () => {
    expect(wrapper.containsMatchingElement(<span>{board.title}</span>)).toBe(
      true
    );
  });

  it("contains a link to the board", () => {
    expect(wrapper.find("Link").prop("to")).toEqual(`/boards/${board.id}`);
  });
});
