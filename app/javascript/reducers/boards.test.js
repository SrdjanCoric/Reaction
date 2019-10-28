import reducer from "./boards";
import * as types from "../constants/ActionTypes";

describe("boards", () => {
  describe("unknown type", () => {
    it("returns the state parameter", () => {
      expect(reducer("param value", { type: "FAKE_TYPE_FOR_TEST" })).toEqual(
        "param value"
      );
    });
  });

  describe("FETCH_BOARDS_SUCCESS", () => {
    it("returns the action.boards value", () => {
      expect(
        reducer([], {
          type: types.FETCH_BOARDS_SUCCESS,
          boards: [
            { id: 1, title: "My board" },
            { id: 2, title: "My other board" }
          ]
        })
      ).toEqual([
        { id: 1, title: "My board" },
        { id: 2, title: "My other board" }
      ]);
    });
  });
});
