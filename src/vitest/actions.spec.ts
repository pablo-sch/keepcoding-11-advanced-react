import {
  authLoginPending,
  authLoginFulfilled,
  authLoginRejected,
  authLogout,
  advertsLoadedFulfilled,
  advertsLoadedRejected,
  advertsDetailFulFilled,
  advertsDetailRejected,
  advertsCreatedFulfilled,
  advertsCreatedRejected,
  advertsDeletedFulfilled,
  advertsDeletedRejected,
  tagsLoadedFulfilled,
  tagsLoadedRejected,
  uiResetError,
} from "../store/actions";

import type { Advert } from "../pages/advert/types";

// SYNCHRONOUS ACTIONS==========================================================================================================
describe("Synchronous action creators", () => {
  // AUTH...............................................................................................
  test("authLoginPending creates correct action", () => {
    expect(authLoginPending()).toEqual({ type: "auth/login/pending" });
  });

  test("authLoginFulfilled creates correct action", () => {
    expect(authLoginFulfilled()).toEqual({ type: "auth/login/fulfilled" });
  });

  test("authLoginRejected creates correct action with error payload", () => {
    const error = new Error("Login failed");
    expect(authLoginRejected(error)).toEqual({
      type: "auth/login/rejected",
      payload: error,
    });
  });

  test("authLogout creates correct action", () => {
    expect(authLogout()).toEqual({ type: "auth/logout" });
  });

  // ADVERTS............................................................................................
  test("advertsLoadedFulfilled creates correct action with adverts payload", () => {
    const adverts: Advert[] = [{ id: "1", name: "Advert 1" } as Advert, { id: "2", name: "Advert 2" } as Advert];
    expect(advertsLoadedFulfilled(adverts)).toEqual({
      type: "adverts/loaded/fulfilled",
      payload: adverts,
    });
  });

  test("advertsLoadedRejected creates correct action with error payload", () => {
    const error = new Error("Load adverts failed");
    expect(advertsLoadedRejected(error)).toEqual({
      type: "adverts/loaded/rejected",
      payload: error,
    });
  });

  test("advertsDetailFulFilled creates correct action with advert payload", () => {
    const advert: Advert = { id: "1", name: "Advert 1" } as Advert;
    expect(advertsDetailFulFilled(advert)).toEqual({
      type: "adverts/detail/fulfilled",
      payload: advert,
    });
  });

  test("advertsDetailRejected creates correct action with error payload", () => {
    const error = new Error("Detail advert failed");
    expect(advertsDetailRejected(error)).toEqual({
      type: "adverts/detail/rejected",
      payload: error,
    });
  });

  test("advertsCreatedFulfilled creates correct action with advert payload", () => {
    const advert: Advert = { id: "3", name: "New Advert" } as Advert;
    expect(advertsCreatedFulfilled(advert)).toEqual({
      type: "adverts/created/fulfilled",
      payload: advert,
    });
  });

  test("advertsCreatedRejected creates correct action with error payload", () => {
    const error = new Error("Create advert failed");
    expect(advertsCreatedRejected(error)).toEqual({
      type: "adverts/created/rejected",
      payload: error,
    });
  });

  test("advertsDeletedFulfilled creates correct action with advertId payload", () => {
    const advertId = "5";
    expect(advertsDeletedFulfilled(advertId)).toEqual({
      type: "adverts/deleted/fulfilled",
      payload: advertId,
    });
  });

  test("advertsDeletedRejected creates correct action with error payload", () => {
    const error = new Error("Delete advert failed");
    expect(advertsDeletedRejected(error)).toEqual({
      type: "adverts/deleted/rejected",
      payload: error,
    });
  });

  // TAGS...............................................................................................
  test("tagsLoadedFulfilled creates correct action with tags payload", () => {
    const tags = ["tag1", "tag2", "tag3"];
    expect(tagsLoadedFulfilled(tags)).toEqual({
      type: "tags/loaded/fulfilled",
      payload: tags,
    });
  });

  test("tagsLoadedRejected creates correct action with error payload", () => {
    const error = new Error("Load tags failed");
    expect(tagsLoadedRejected(error)).toEqual({
      type: "tags/loaded/rejected",
      payload: error,
    });
  });

  // UI.................................................................................................
  test("uiResetError creates correct action", () => {
    expect(uiResetError()).toEqual({ type: "ui/reset-error" });
  });
});
