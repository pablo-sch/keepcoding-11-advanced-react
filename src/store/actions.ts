//DEPENDENCIES
import type { AppThunk } from ".";

//SERVICES
import type { Advert } from "../pages/advert/types";
import type { Credentials } from "../pages/auth/types";

//REDUX
import { getAdvert } from "./selectors";

//Tipos de acciones===========================================================================================================
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

// ................................................

type AdvertsLoadedFulFilled = {
  type: "adverts/loaded/fulfilled";
  payload: Advert[];
};

type AdvertsCreatedFulFilled = {
  type: "adverts/created/fulfilled";
  payload: Advert;
};

type AdvertsCreatedRejected = {
  type: "adverts/created/rejected";
  payload: Error;
};

type AdvertsDetailFulFilled = {
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

// ................................................

type TagsLoadedFulfilled = {
  type: "tags/loaded/fulfilled";
  payload: string[];
};

// ................................................

type UiResetError = {
  type: "ui/reset-error";
};

//Acciones sincrónicas============================================================================================================
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

//Thunks (acciones asíncronas)===============================================================================================0
export function authLogin(credentials: Credentials): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    dispatch(authLoginPending());
    try {
      await api.auth.login(credentials);
      dispatch(authLoginFulfilled());
      console.log(router);
      const to = router.state.location.state?.from ?? "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(authLoginRejected(error));
      }
      throw error;
    }
  };
}

export const authLogout = (): AuthLogout => ({
  type: "auth/logout",
});

// ................................................

export const advertsLoadedFulFilled = (adverts: Advert[]): AdvertsLoadedFulFilled => ({
  type: "adverts/loaded/fulfilled",
  payload: adverts,
});

export const advertsDetailFulFilled = (advert: Advert): AdvertsDetailFulFilled => ({
  type: "adverts/detail/fulfilled",
  payload: advert,
});

export const advertsDetailRejected = (error: Error): AdvertsDetailRejected => ({
  type: "adverts/detail/rejected",
  payload: error,
});

export const advertsCreatedFulfilled = (advert: Advert): AdvertsCreatedFulFilled => ({
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

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (state.adverts.loaded) {
      return;
    }
    try {
      const adverts = await api.adverts.getAdverts();
      dispatch(advertsLoadedFulFilled(adverts));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(advertsDetailRejected(error));
      }
      throw error;
    }
  };
}

// ................................................

export function advertsDelete(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api, router }) {
    try {
      await api.adverts.deleteAdvert(advertId);
      dispatch(advertsDeletedFulfilled(advertId));
      router.navigate(`/adverts`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        dispatch(advertsDetailRejected(error));
      }
      throw error;
    }
  };
}

// ................................................

export function advertDetail(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, getState, { api }) {
    const state = getState();
    if (getAdvert(advertId)(state)) {
      return;
    }
    try {
      const advert = await api.adverts.getAdvert(advertId);
      dispatch(advertsDetailFulFilled(advert));
    } catch (error) {
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
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        dispatch(advertsCreatedRejected(error));
      }
      throw error;
    }
  };
}

// ................................................

export function tagsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, _getState, { api }) {
    try {
      const tags = await api.adverts.getTags();
      dispatch({ type: "tags/loaded/fulfilled", payload: tags });
    } catch (error) {
      console.error("Error loading tags:", error);
      throw error;
    }
  };
}

//Acción para resetear errores de UI============================================================================================
export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

//Unificacion de Acciones----------------------------------------------------------------
export type Actions = AuthLoginPending | AuthLoginFulfilled | AuthLoginRejected | AuthLogout | AdvertsLoadedFulFilled | AdvertsDetailFulFilled | AdvertsDetailRejected | AdvertsCreatedFulFilled | AdvertsCreatedRejected | AdvertsDeletedFulfilled | AdvertsDeletedRejected | TagsLoadedFulfilled | UiResetError;

export type ActionsRejected = AuthLoginRejected | AdvertsCreatedRejected | AdvertsDetailRejected | AdvertsDeletedRejected;
