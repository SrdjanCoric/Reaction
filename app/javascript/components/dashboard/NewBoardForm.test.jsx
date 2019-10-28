import React from 'react';
import { mount } from 'enzyme';

import NewBoardForm from './NewBoardForm';

import apiClient from '../../lib/ApiClient';
jest.mock('../../lib/ApiClient');

describe("NewBoardForm", () => {
  it("displays the `title` prop", () => {
    const wrapper = mount(
      <NewBoardForm
        title="This is my title!!"
        onTextChange={() => {}}
        onCloseClick={() => {}}
        onSubmit={() => {}}
      />
    );

    expect(
      wrapper.html().indexOf('value="This is my title!!"')
    )
  });
});
