// REDUX
import { getAdvert, getAdverts, getIsLogged, getTags, getUi } from "../store/selectors";
import { mockedAdverts } from "../utils/mockedAdverts";
import type { RootState } from "../store";

const state: RootState = {
  auth: true,
  adverts: {
    loaded: true,
    data: mockedAdverts,
  },
  tags: ["tag1", "tag2"],
  ui: {
    pending: false,
    error: null,
  },
};

describe("Selectors", () => {
  test("getIsLogged should return auth state", () => {
    expect(getIsLogged(state)).toBe(true);
  });

  test("getAdverts should return the list of adverts", () => {
    expect(getAdverts(state)).toEqual(mockedAdverts);
  });

  test("getAdvert should return the advert with id '1'", () => {
    const result = getAdvert("1")(state);
    expect(result).toEqual(mockedAdverts[0]);
  });

  test("getAdvert should return undefined if advert not found", () => {
    const result = getAdvert("3")(state);
    expect(result).toBeUndefined();
  });

  test("getTags should return the list of tags", () => {
    expect(getTags(state)).toEqual(["tag1", "tag2"]);
  });

  test("getUi should return the ui state", () => {
    expect(getUi(state)).toEqual({
      pending: false,
      error: null,
    });
  });
});
