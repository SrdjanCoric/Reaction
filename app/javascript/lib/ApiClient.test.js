import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import flushPromises from "flush-promises";

import client from "./ApiClient";
import * as routes from "../constants/ApiRoutes";

describe("ApiClient", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("getBoards", () => {
    const boards = [
      {
        id: 1,
        title: "My board"
      }
    ];

    describe("successful request", () => {
      it("calls the callback with the boards", async () => {
        const cb = jest.fn();

        mock.onGet(routes.BOARDS_INDEX_URL).reply(200, boards);
        client.getBoards(cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith(boards);
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "You don't have access to that";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onGet(routes.BOARDS_INDEX_URL).reply(401, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.getBoards(boards => {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(
          `HTTP Error: ${errorText}`
        );
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();
        client.getBoards(cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("getBoard", () => {
    const board = {
      id: 1,
      title: "My board",
      lists: [{ id: 1, title: "My list" }]
    };

    describe("valid board id", () => {
      it("calls the callback with the board", async () => {
        const cb = jest.fn();

        mock.onGet(routes.boardUrl(1)).reply(200, board);
        client.getBoard(1, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith(board);
      });
    });

    describe("invalid board id", () => {
      const originalError = global.console.error;
      const errorText = "You don't have access to that";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onGet(routes.boardUrl(1)).reply(401, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.getBoard(1, board => {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(
          `HTTP Error: ${errorText}`
        );
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();
        client.getBoard(1, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("createBoard", () => {
    describe("successful request", () => {
      const newBoard = {
        title: "My new board"
      };

      it("calls the callback with the new board", async () => {
        const cb = jest.fn();

        mock
          .onPost(routes.CREATE_BOARD_URL)
          .reply(201, { ...newBoard, id: 37 });
        client.createBoard(newBoard, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith({ ...newBoard, id: 37 });
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "That is not a valid record";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onPost(routes.CREATE_BOARD_URL).reply(422, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.createBoard({});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(
          `HTTP Error: ${errorText}`
        );
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();

        client.createBoard({}, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("createList", () => {
    describe("successful request", () => {
      const newList = {
        title: "My new list"
      };

      it("calls the callback with the new list", async () => {
        const cb = jest.fn();

        mock.onPost(routes.CREATE_LIST_URL).reply(201, { ...newList, id: 22 });
        client.createList(1, newList, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith({ ...newList, id: 22 });
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "That is not a valid record";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onPost(routes.CREATE_LIST_URL).reply(422, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.createList(1, {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(
          `HTTP Error: ${errorText}`
        );
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();

        client.createList(1, {}, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("updateList", () => {
    describe("successful request", () => {
      const list = { id: 1, title: "My list", position: 1.0 };
      const updatedList = { id: 1, title: "New title", position: 1.0 };

      it("calls the callback with the updated list", async () => {
        const cb = jest.fn();

        mock.onPut(routes.updateListUrl(1)).reply(200, updatedList);
        client.updateList(1, list, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith(updatedList);
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "That is not a valid record";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onPut(routes.updateListUrl(1)).reply(422, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.updateList(1, {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(
          `HTTP Error: ${errorText}`
        );
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();

        client.updateList(1, {}, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("createCard", () => {
    describe("successful request", () => {
      const newCard = { title: "My new card" };

      it("calls the callback with the new list", async () => {
        const cb = jest.fn();

        mock.onPost(routes.CREATE_CARD_URL).reply(201, { ...newCard, id: 1 });
        client.createCard(1, newCard, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith({ ...newCard, id: 1 });
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "That is not a valid record";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onPost(routes.CREATE_CARD_URL).reply(422, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.createCard(1, {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(
          `HTTP Error: ${errorText}`
        );
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();

        client.createCard(1, {}, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("getCard", () => {
    const card = {
      id: 1,
      title: "My card"
    };

    describe("valid card id", () => {
      it("calls the callback with the board", async () => {
        const cb = jest.fn();

        mock.onGet(routes.cardUrl(1)).reply(200, card);
        client.getCard(1, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith(card);
      });
    });

    describe("invalid board id", async () => {
      const originalError = global.console.error;
      const errorText = "You don't have access to that";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onGet(routes.cardUrl(1)).reply(401, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.getCard(1, card => {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(
          `HTTP Error: ${errorText}`
        );
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();
        client.getCard(1, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("updateCard", () => {
    describe("successful request", () => {
      const card = { id: 1, title: "My card" };
      const updatedCard = { id: 1, title: "New title" };

      it("calls the callback with the updated list", async () => {
        const cb = jest.fn();

        mock.onPut(routes.updateCardUrl(1)).reply(200, updatedCard);
        client.updateCard(1, card, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith(updatedCard);
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "That is not a valid record";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onPut(routes.updateCardUrl(1)).reply(422, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.updateCard(1, {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(
          `HTTP Error: ${errorText}`
        );
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();

        client.updateCard(1, {}, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });

  describe("createComment", () => {
    describe("successful request", () => {
      const newComment = { text: "My comment" };

      it("calls the callback with the new list", async () => {
        const cb = jest.fn();

        mock
          .onPost(routes.CREATE_COMMENT_URL)
          .reply(201, { ...newComment, id: 1 });
        client.createComment(1, newComment, cb);

        await flushPromises();

        expect(cb).toHaveBeenCalledWith({ ...newComment, id: 1 });
      });
    });

    describe("failed request", () => {
      const originalError = global.console.error;
      const errorText = "That is not a valid record";

      beforeEach(() => {
        global.console.error = jest.fn();
        mock.onPost(routes.CREATE_COMMENT_URL).reply(422, { error: errorText });
      });

      afterEach(() => {
        global.console.error = originalError;
      });

      it("logs the error", async () => {
        client.createComment(1, {});

        await flushPromises();

        expect(global.console.error).toHaveBeenCalledWith(
          `HTTP Error: ${errorText}`
        );
      });

      it("doesn't call the callback", async () => {
        const cb = jest.fn();

        client.createComment(1, {}, cb);

        await flushPromises();

        expect(cb).not.toHaveBeenCalled();
      });
    });
  });
});
