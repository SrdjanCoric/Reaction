import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";

configure({ adapter: new Adapter() });
import CreateBoardTileForm from "./CreateBoardTileForm";
jest.mock("../../lib/ApiClient");

describe("CreateBoardTileForm", () => {
  it("displays the `title` prop", () => {
    const wrapper = mount(
      <CreateBoardTileForm
        title="This is my title!!"
        onTextChange={() => {}}
        onCloseClick={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(wrapper.html().indexOf('value="This is my title!!"'));
  });
});
