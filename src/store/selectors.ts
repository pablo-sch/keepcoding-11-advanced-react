import type { RootState } from ".";

export const getIsLogged = (state: RootState) => state.auth;

export const getAdverts = (state: RootState) => state.adverts ?? [];

// export const getTweet = (state: RootState, advertId?: string) =>
//   state.adverts.find((advert) => advert.id === Number(advertId));

export function getAdvert(advertId?: string) {
  return function (state: RootState) {
    return state.adverts?.find((advert) => advert.id === advertId);
  };
}

export const getUi = (state: RootState) => state.ui;
