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
  authLogin,
  advertsLoaded,
  advertsCreate,
  tagsLoaded,
  advertsDelete,
  advertDetail,
} from "../store/actions";

import type { Advert } from "../pages/advert/types";
import type { Credentials } from "../pages/auth/types";
import { mockedAdverts } from "../utils/mockAdverts";
import { mockTags } from "./../utils/mockTags";

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

// ASYNCHRONOUS ACTIONS (Thunks)=================================================================================================
// AUTH:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
describe("authLogin", () => {
  const credentials: Credentials = {
    email: "example@gmail.com",
    password: "1234",
  };

  const dispatch = vi.fn();
  const api = {
    auth: {
      login: vi.fn(),
    },
  };
  const from = "/from";
  const router = {
    state: { location: { state: { from } } },
    navigate: vi.fn(),
  };

  const thunk = authLogin(credentials);

  afterEach(() => {
    dispatch.mockClear();
    router.navigate.mockClear();
  });

  test("when login resolves", async () => {
    api.auth.login.mockResolvedValue(undefined);

    // @ts-expect-error: no need getState
    await thunk(dispatch, undefined, { api, router });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFulfilled());

    expect(api.auth.login).toHaveBeenCalledWith(credentials);
    expect(router.navigate).toHaveBeenCalledWith(from, { replace: true });
  });

  test("when login rejects", async () => {
    const error = new Error("unauthorized");
    api.auth.login.mockRejectedValue(error);

    await expect(() =>
      // @ts-expect-error: no need getState
      thunk(dispatch, undefined, { api, router })
    ).rejects.toThrowError(error);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginRejected(error));
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

// ADVERTS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// advertsLoaded.....................................................................................
describe("advertsLoaded", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();
  const api = {
    adverts: {
      getAdverts: vi.fn(),
    },
  };
  const router = {
    navigate: vi.fn(),
  };

  const thunk = advertsLoaded();

  afterEach(() => {
    dispatch.mockClear();
    getState.mockClear();
    api.adverts.getAdverts.mockClear();
    router.navigate.mockClear();
  });

  test("does nothing if adverts are already loaded", async () => {
    getState.mockReturnValue({
      adverts: {
        loaded: true,
        data: mockedAdverts,
      },
    });

    // @ts-expect-error: no need getState
    await thunk(dispatch, getState, { api, router });

    expect(dispatch).not.toHaveBeenCalled();
    expect(api.adverts.getAdverts).not.toHaveBeenCalled();
  });

  test("loads adverts and dispatches advertsLoadedFulfilled", async () => {
    getState.mockReturnValue({
      adverts: {
        loaded: false,
        data: [],
      },
    });

    api.adverts.getAdverts.mockResolvedValue(mockedAdverts);

    // @ts-expect-error: no need getState
    await thunk(dispatch, getState, { api, router });

    expect(api.adverts.getAdverts).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(advertsLoadedFulfilled(mockedAdverts));
  });

  test("dispatches advertsLoadedRejected if getAdverts throws", async () => {
    const error = new Error("API error");
    getState.mockReturnValue({
      adverts: {
        loaded: false,
        data: [],
      },
    });

    api.adverts.getAdverts.mockRejectedValue(error);

    // @ts-expect-error: no need getState
    await expect(thunk(dispatch, getState, { api, router })).rejects.toThrow(error);

    expect(dispatch).toHaveBeenCalledWith(advertsLoadedRejected(error));
  });
});

// advertsCreate.....................................................................................
describe("advertsCreate", () => {
  const dispatch = vi.fn();
  const router = {
    navigate: vi.fn(),
  };
  const api = {
    adverts: {
      createAdvert: vi.fn(),
      getAdvert: vi.fn(),
    },
  };
  const advertContent = new FormData();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("dispatches advertsCreatedFulfilled and navigates on success", async () => {
    const createdAdvert = { id: mockedAdverts[0].id };
    const fetchedAdvert: Advert = mockedAdverts[0];

    api.adverts.createAdvert.mockResolvedValue(createdAdvert);
    api.adverts.getAdvert.mockResolvedValue(fetchedAdvert);

    const thunk = advertsCreate(advertContent);

    // @ts-expect-error: no need getState
    const result = await thunk(dispatch, undefined, { api, router });

    expect(api.adverts.createAdvert).toHaveBeenCalledWith(advertContent);
    expect(api.adverts.getAdvert).toHaveBeenCalledWith(mockedAdverts[0].id);
    expect(dispatch).toHaveBeenCalledWith(advertsCreatedFulfilled(fetchedAdvert));
    expect(router.navigate).toHaveBeenCalledWith(`/adverts/${mockedAdverts[0].id}`);
    expect(result).toEqual(fetchedAdvert);
  });

  test("dispatches advertsCreatedRejected on failure", async () => {
    const error = new Error("Failed to create advert");
    api.adverts.createAdvert.mockRejectedValue(error);

    const thunk = advertsCreate(advertContent);

    // @ts-expect-error: no need getState
    await expect(thunk(dispatch, undefined, { api, router })).rejects.toThrow(error);

    expect(dispatch).toHaveBeenCalledWith(advertsCreatedRejected(error));
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

// ADVERTS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// advertsLoaded.....................................................................................
describe("advertsLoaded", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();
  const api = {
    adverts: {
      getAdverts: vi.fn(),
    },
  };
  const router = {
    navigate: vi.fn(),
  };

  const thunk = advertsLoaded();

  afterEach(() => {
    dispatch.mockClear();
    getState.mockClear();
    api.adverts.getAdverts.mockClear();
    router.navigate.mockClear();
  });

  test("does nothing if adverts are already loaded", async () => {
    getState.mockReturnValue({
      adverts: {
        loaded: true,
        data: mockedAdverts,
      },
    });

    // @ts-expect-error: no need getState
    await thunk(dispatch, getState, { api, router });

    expect(dispatch).not.toHaveBeenCalled();
    expect(api.adverts.getAdverts).not.toHaveBeenCalled();
  });

  test("loads adverts and dispatches advertsLoadedFulfilled", async () => {
    getState.mockReturnValue({
      adverts: {
        loaded: false,
        data: [],
      },
    });

    api.adverts.getAdverts.mockResolvedValue(mockedAdverts);

    // @ts-expect-error: no need getState
    await thunk(dispatch, getState, { api, router });

    expect(api.adverts.getAdverts).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(advertsLoadedFulfilled(mockedAdverts));
  });

  test("dispatches advertsLoadedRejected if getAdverts throws", async () => {
    const error = new Error("API error");
    getState.mockReturnValue({
      adverts: {
        loaded: false,
        data: [],
      },
    });

    api.adverts.getAdverts.mockRejectedValue(error);

    // @ts-expect-error: no need getState
    await expect(thunk(dispatch, getState, { api, router })).rejects.toThrow(error);

    expect(dispatch).toHaveBeenCalledWith(advertsLoadedRejected(error));
  });
});

// advertsCreate.....................................................................................
describe("advertsCreate", () => {
  const dispatch = vi.fn();
  const router = {
    navigate: vi.fn(),
  };
  const api = {
    adverts: {
      createAdvert: vi.fn(),
      getAdvert: vi.fn(),
    },
  };
  const advertContent = new FormData();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("dispatches advertsCreatedFulfilled and navigates on success", async () => {
    const createdAdvert = { id: mockedAdverts[0].id };
    const fetchedAdvert: Advert = mockedAdverts[0];

    api.adverts.createAdvert.mockResolvedValue(createdAdvert);
    api.adverts.getAdvert.mockResolvedValue(fetchedAdvert);

    const thunk = advertsCreate(advertContent);

    // @ts-expect-error: no need getState
    const result = await thunk(dispatch, undefined, { api, router });

    expect(api.adverts.createAdvert).toHaveBeenCalledWith(advertContent);
    expect(api.adverts.getAdvert).toHaveBeenCalledWith(mockedAdverts[0].id);
    expect(dispatch).toHaveBeenCalledWith(advertsCreatedFulfilled(fetchedAdvert));
    expect(router.navigate).toHaveBeenCalledWith(`/adverts/${mockedAdverts[0].id}`);
    expect(result).toEqual(fetchedAdvert);
  });

  test("dispatches advertsCreatedRejected on failure", async () => {
    const error = new Error("Failed to create advert");
    api.adverts.createAdvert.mockRejectedValue(error);

    const thunk = advertsCreate(advertContent);

    // @ts-expect-error: no need getState
    await expect(thunk(dispatch, undefined, { api, router })).rejects.toThrow(error);

    expect(dispatch).toHaveBeenCalledWith(advertsCreatedRejected(error));
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

// advertDetail.....................................................................................
describe("advertDetail", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();
  const api = {
    adverts: {
      getAdvert: vi.fn(),
    },
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("does nothing if advert already exists in state", async () => {
    const advertId = "1";
    getState.mockReturnValue({
      adverts: {
        loaded: true,
        data: mockedAdverts,
      },
    });

    const thunk = advertDetail(advertId);

    // @ts-expect-error: no need getState
    await thunk(dispatch, getState, { api });

    expect(dispatch).not.toHaveBeenCalled();
    expect(api.adverts.getAdvert).not.toHaveBeenCalled();
  });

  test("fetches advert and dispatches advertsDetailFulFilled", async () => {
    const advertId = "999";
    getState.mockReturnValue({
      adverts: {
        loaded: true,
        data: mockedAdverts,
      },
    });
    api.adverts.getAdvert.mockResolvedValue(mockedAdverts[0]);

    const thunk = advertDetail(advertId);

    // @ts-expect-error: no need getState
    await thunk(dispatch, getState, { api });

    expect(api.adverts.getAdvert).toHaveBeenCalledWith(advertId);
    expect(dispatch).toHaveBeenCalledWith(advertsDetailFulFilled(mockedAdverts[0]));
  });

  test("dispatches advertsDetailRejected on API error", async () => {
    const advertId = "999";
    const error = new Error("Advert not found");
    getState.mockReturnValue({
      adverts: {
        loaded: true,
        data: mockedAdverts,
      },
    });
    api.adverts.getAdvert.mockRejectedValue(error);

    const thunk = advertDetail(advertId);

    // @ts-expect-error: no need getState
    await thunk(dispatch, getState, { api });

    expect(dispatch).toHaveBeenCalledWith(advertsDetailRejected(error));
  });
});

// advertsDelete.....................................................................................
describe("advertsDelete", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();
  const api = {
    adverts: {
      deleteAdvert: vi.fn(),
    },
  };
  const router = {
    navigate: vi.fn(),
  };
  const advertId = "123";

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("deletes advert, dispatches success action and navigates", async () => {
    api.adverts.deleteAdvert.mockResolvedValue({});

    const thunk = advertsDelete(advertId);

    // @ts-expect-error: no need getState
    await thunk(dispatch, getState, { api, router });

    expect(api.adverts.deleteAdvert).toHaveBeenCalledWith(advertId);
    expect(dispatch).toHaveBeenCalledWith(advertsDeletedFulfilled(advertId));
    expect(router.navigate).toHaveBeenCalledWith("/adverts");
  });

  test("dispatches advertsDeletedRejected on API error", async () => {
    const error = new Error("Failed to delete advert");
    api.adverts.deleteAdvert.mockRejectedValue(error);

    const thunk = advertsDelete(advertId);

    // @ts-expect-error: no need getState
    await expect(thunk(dispatch, getState, { api, router })).rejects.toThrow(error);

    expect(dispatch).toHaveBeenCalledWith(advertsDeletedRejected(error));
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

// tagsLoaded.....................................................................................
describe("tagsLoaded", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();
  const api = {
    adverts: {
      getTags: vi.fn(),
    },
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("loads tags and dispatches tagsLoadedFulfilled", async () => {
    api.adverts.getTags.mockResolvedValue(mockTags);

    const thunk = tagsLoaded();

    // @ts-expect-error: no need getState
    await thunk(dispatch, getState, { api });

    expect(api.adverts.getTags).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(tagsLoadedFulfilled(mockTags));
  });

  test("dispatches tagsLoadedRejected on API error", async () => {
    const error = new Error("Failed to load tags");
    api.adverts.getTags.mockRejectedValue(error);

    const thunk = tagsLoaded();

    // @ts-expect-error: no need getState
    await expect(thunk(dispatch, getState, { api })).rejects.toThrow(error);

    expect(dispatch).toHaveBeenCalledWith(tagsLoadedRejected(error));
  });
});
