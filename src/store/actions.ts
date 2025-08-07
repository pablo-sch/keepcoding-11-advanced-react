//DEPENDENCIES
import type { AppThunk } from ".";

//REACT
import type { Advert } from "../pages/advert/types";
import type { Credentials } from "../pages/auth/types";

//REDUX
import { getAdvert } from "./selectors";

//Action Types================================================================================================================
// AUTH............................................
type AuthLoginPending = {
  type: "auth/login/pending";
};

type AuthLoginFulfilled = {
  type: "auth/login/fulfilled";
};

type AuthLoginRejected = {
  type: "auth/login/rejected";
  payload: Error;
};

type AuthLogout = {
  type: "auth/logout";
};

// ADVERTS.........................................
type AdvertsLoadedFulfilled = {
  type: "adverts/loaded/fulfilled";
  payload: Advert[];
};

type AdvertsLoadedRejected = {
  type: "adverts/loaded/rejected";
  payload: Error;
};

type AdvertsCreatedFulfilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};

type AdvertsCreatedRejected = {
  type: "adverts/created/rejected";
  payload: Error;
};

type AdvertsDetailFulfilled = {
  type: "adverts/detail/fulfilled";
  payload: Advert;
};

type AdvertsDetailRejected = {
  type: "adverts/detail/rejected";
  payload: Error;
};

type AdvertsDeletedFulfilled = {
  type: "adverts/deleted/fulfilled";
  payload: string;
};

type AdvertsDeletedRejected = {
  type: "adverts/deleted/rejected";
  payload: Error;
};

// TAGS............................................
type TagsLoadedFulfilled = {
  type: "tags/loaded/fulfilled";
  payload: string[];
};

type TagsLoadedRejected = {
  type: "tags/loaded/rejected";
  payload: Error;
};

// UI..............................................
type UiResetError = {
  type: "ui/reset-error";
};

//Action Creator (Synchronized Actions)============================================================================================
// AUTH............................................
export const authLoginPending = (): AuthLoginPending => ({
  type: "auth/login/pending",
});

export const authLoginFulfilled = (): AuthLoginFulfilled => ({
  type: "auth/login/fulfilled",
});

export const authLoginRejected = (error: Error): AuthLoginRejected => ({
  type: "auth/login/rejected",
  payload: error,
});

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

// ADVERTS.........................................
export const advertsLoadedFulfilled = (adverts: Advert[]): AdvertsLoadedFulfilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const advertsLoadedRejected = (error: Error): AdvertsLoadedRejected => ({
  type: "adverts/loaded/rejected",
  payload: error,
});

export const advertsDetailFulFilled = (advert: Advert): AdvertsDetailFulfilled => ({
  type: "adverts/detail/fulfilled",
  payload: advert,
});

export const advertsDetailRejected = (error: Error): AdvertsDetailRejected => ({
  type: "adverts/detail/rejected",
  payload: error,
});

export const advertsCreatedFulfilled = (advert: Advert): AdvertsCreatedFulfilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export const advertsCreatedRejected = (error: Error): AdvertsCreatedRejected => ({
  type: "adverts/created/rejected",
  payload: error,
});

export const advertsDeletedFulfilled = (advertId: string): AdvertsDeletedFulfilled => ({
  type: "adverts/deleted/fulfilled",
  payload: advertId,
});

export const advertsDeletedRejected = (error: Error): AdvertsDeletedRejected => ({
  type: "adverts/deleted/rejected",
  payload: error,
});

// TAGS............................................
export const tagsLoadedFulfilled = (tags: string[]): TagsLoadedFulfilled => ({
  type: "tags/loaded/fulfilled",
  payload: tags,
});

export const tagsLoadedRejected = (error: Error): TagsLoadedRejected => ({
  type: "tags/loaded/rejected",
  payload: error,
});

// UI..............................................
export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

//Thunks (Asynchronous Actions)================================================================================================
// AUTH............................................
export function authLogin(credentials: Credentials): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginFulfilled());
      console.log(router);
      const to = router.state.location.state?.from ?? "/";
      router.navigate(to, { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
      console.log(error);
      throw error;
    }
  };
}

// ADVERTS.........................................
export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (state.adverts.loaded) {
      return;
    }
    try {
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedFulfilled(adverts));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(advertsLoadedRejected(error));
      }
      console.log(error);
      throw error;
    }
  };
}

export function advertDetail(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (getAdvert(advertId)(state)) {
      return;
    }
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertsDetailFulFilled(advert));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(advertsDetailRejected(error));
      }
      console.log(error);
      throw error;
    }
  };
}

export function advertsDelete(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    try {
      await api.adverts.deleteAdvert(advertId);
      dispatch(advertsDeletedFulfilled(advertId));
      router.navigate(`/adverts`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(advertsDeletedRejected(error));
      }
      console.log(error);
      throw error;
    }
  };
}

export function advertsCreate(advertContent: FormData): AppThunk<Promise<Advert>> {
  return async function (dispatch, _getState, { api, router }) {
    try {
      const createdAdvert = await api.adverts.createAdvert(advertContent);
      const advert = await api.adverts.getAdvert(createdAdvert.id.toString());
      dispatch(advertsCreatedFulfilled(advert));
      router.navigate(`/adverts/${createdAdvert.id}`);
      return advert;
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(advertsCreatedRejected(error));
      }
      console.log(error);
      throw error;
    }
  };
}

// TAGS............................................
export function tagsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    try {
      const tags = await api.adverts.getTags();
      dispatch(tagsLoadedFulfilled(tags));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(tagsLoadedRejected(error));
      }
      console.log(error);
      throw error;
    }
  };
}

//Unificación de Acciones----------------------------------------------------------------
// prettier-ignore
export type Actions = 
| AuthLoginPending 
| AuthLoginFulfilled 
| AuthLoginRejected 
| AuthLogout 
| AdvertsLoadedFulfilled 
| AdvertsLoadedRejected 
| AdvertsDetailFulfilled 
| AdvertsDetailRejected 
| AdvertsCreatedFulfilled 
| AdvertsCreatedRejected 
| AdvertsDeletedFulfilled 
| AdvertsDeletedRejected 
| TagsLoadedFulfilled 
| TagsLoadedRejected
| UiResetError;

// prettier-ignore
export type ActionsRejected = 
| AuthLoginRejected 
| AdvertsLoadedRejected
| AdvertsCreatedRejected 
| AdvertsDetailRejected 
| AdvertsDeletedRejected
| TagsLoadedRejected;
