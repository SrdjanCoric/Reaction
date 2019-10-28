import BoardTile from './BoardTile';
import React from 'react';
import { shallow } from 'enzyme';

describe("BoardTile", () => {
  it("renders the board title", () => {
    const wrapper = shallow(<BoardTile title="Web Development" />);

    expect(
      wrapper.containsMatchingElement(<span>Web Development</span>)
    ).toBe(true);
  });

  it("contains a link to the board");
});
