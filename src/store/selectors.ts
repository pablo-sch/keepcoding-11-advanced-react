//REDUX
import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;
export const getAdverts = (state: RootState) => state.adverts.data;

export function getAdvert(advertId?: string) {
  return function (state: RootState) {
    return state.adverts.data.find((advert) => advert.id === advertId);
  };
}

export function getTags(state: RootState): string[] {
  return state.tags;
}

export const getUi = (state: RootState) => state.ui;
