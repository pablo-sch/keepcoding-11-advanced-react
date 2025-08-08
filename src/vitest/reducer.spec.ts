// REACT
import type { Advert } from "../pages/advert/types";

// REDUX
import { auth, adverts, tags, ui } from "../store/reducer";
import type { Actions, ActionsRejected } from "../store/actions";
import { mockedAdverts } from "../utils/mockAdverts";

const advertMock: Advert = mockedAdverts[0];

//AUTH REDUCER=================================================================================================================
describe("auth reducer", () => {
  test('should return true for "auth/login/fulfilled"', () => {
    const action: Actions = { type: "auth/login/fulfilled" };
    expect(auth(false, action)).toBe(true);
  });

  test('should return false for "auth/logout"', () => {
    const action: Actions = { type: "auth/logout" };
    expect(auth(true, action)).toBe(false);
  });

  test("should return the current state for unknown actions", () => {
    const action = { type: "other/action" } as unknown as Actions;
    expect(auth(true, action)).toBe(true);
  });
});

//ADVERT REDUCER===============================================================================================================
describe("adverts reducer", () => {
  test('should handle "adverts/loaded/fulfilled"', () => {
    const action: Actions = {
      type: "adverts/loaded/fulfilled",
      payload: [advertMock],
    };
    const state = { loaded: false, data: [] };
    expect(adverts(state, action)).toEqual({ loaded: true, data: [advertMock] });
  });

  test('should handle "adverts/detail/fulfilled"', () => {
    const action: Actions = {
      type: "adverts/detail/fulfilled",
      payload: advertMock,
    };
    const state = { loaded: true, data: [] };
    expect(adverts(state, action)).toEqual({ loaded: false, data: [advertMock] });
  });

  test('should handle "adverts/created/fulfilled"', () => {
    const newAdvert: Advert = { ...advertMock, id: "2" };
    const action: Actions = {
      type: "adverts/created/fulfilled",
      payload: newAdvert,
    };
    const state = { loaded: true, data: [advertMock] };
    expect(adverts(state, action)).toEqual({ loaded: true, data: [newAdvert, advertMock] });
  });

  test('should handle "adverts/deleted/fulfilled"', () => {
    const action: Actions = {
      type: "adverts/deleted/fulfilled",
      payload: "1",
    };
    const state = { loaded: true, data: [advertMock] };
    expect(adverts(state, action)).toEqual({ loaded: true, data: [] });
  });

  test("should return the current state for unknown actions", () => {
    const action = { type: "other/action" } as unknown as Actions;
    const state = { loaded: true, data: [advertMock] };
    expect(adverts(state, action)).toEqual(state);
  });
});

//TAGS REDUCER=================================================================================================================
describe("tags reducer", () => {
  test('should handle "tags/loaded/fulfilled"', () => {
    const action: Actions = {
      type: "tags/loaded/fulfilled",
      payload: ["tag1", "tag2"],
    };
    expect(tags([], action)).toEqual(["tag1", "tag2"]);
  });

  test("should return current state for unknown actions", () => {
    const action = { type: "other/action" } as unknown as Actions;
    const state = ["tag1"];
    expect(tags(state, action)).toEqual(state);
  });
});

//UI REDUCER===================================================================================================================
describe("ui reducer", () => {
  test('should handle "auth/login/pending"', () => {
    const action: Actions = { type: "auth/login/pending" };
    const prevState = { pending: false, error: new Error("fail") };
    expect(ui(prevState, action)).toEqual({ pending: true, error: null });
  });

  test('should handle "auth/login/fulfilled"', () => {
    const action: Actions = { type: "auth/login/fulfilled" };
    const prevState = { pending: true, error: new Error("fail") };
    expect(ui(prevState, action)).toEqual({ pending: false, error: null });
  });

  test("should handle rejected actions and set error", () => {
    const error = new Error("failure");
    const action: ActionsRejected = {
      type: "auth/login/rejected",
      payload: error,
    };
    const prevState = { pending: true, error: null };
    expect(ui(prevState, action)).toEqual({ pending: false, error });
  });

  test('should handle "ui/reset-error" and clear error', () => {
    const action: Actions = { type: "ui/reset-error" };
    const prevState = { pending: false, error: new Error("fail") };
    expect(ui(prevState, action)).toEqual({ pending: false, error: null });
  });

  test("should return current state for unknown actions", () => {
    const action = { type: "other/action" } as unknown as Actions;
    const prevState = { pending: false, error: null };
    expect(ui(prevState, action)).toEqual(prevState);
  });
});
