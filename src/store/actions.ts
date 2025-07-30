//DEPENDENCIES
import type { AppThunk } from ".";
import { login } from "../pages/auth/service";
import type { Credentials } from "../pages/auth/types";

//SERVICES
import { createAdvert, getAdverts, getAdvert as getAdvertService, deleteAdvert, getTags } from "../pages/advert/service";
import type { Advert } from "../pages/advert/types";
import { getAdvert } from "./selectors";

//Tipos de acciones===========================================================================================================
/**
 * Define los tipos de acciones que pueden ser enviadas (dispatch) al store,
 * incluyendo acciones para login, logout, adverts y errores de UI.
 */
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

type AdvertsDetailFulFilled = {
  type: "adverts/detail/fulfilled";
  payload: Advert;
};

type AdvertsDeletedFulfilled = {
  type: "adverts/deleted/fulfilled";
  payload: string;
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
/**
 * Funciones que devuelven objetos de acción con un type (y opcionalmente un payload).
 * Se usan para actualizar el estado del store.
 */
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
/**
 * Funciones que permiten ejecutar lógica asíncrona (como llamadas a la API) y luego despachar acciones según el resultado.
 * Usan el middleware redux-thunk.
 */
export function authLogin(credentials: Credentials): AppThunk<Promise<void>> {
  return async function (dispatch) {
    dispatch(authLoginPending());
    try {
      await login(credentials);
      dispatch(authLoginFulfilled());
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

export const advertsCreatedFulfilled = (advert: Advert): AdvertsCreatedFulFilled => ({
  type: "adverts/created/fulfilled",
  payload: advert,
});

export const advertsDeletedFulfilled = (advertId: string): AdvertsDeletedFulfilled => ({
  type: "adverts/deleted/fulfilled",
  payload: advertId,
});

export function advertsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (state.adverts.loaded) {
      return;
    }
    try {
      const adverts = await getAdverts();
      dispatch(advertsLoadedFulFilled(adverts));
    } catch (error) {
      console.log(error);
    }
  };
}

// ................................................

export function advertsDelete(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch) {
    try {
      await deleteAdvert(advertId);
      dispatch(advertsDeletedFulfilled(advertId));
    } catch (error) {
      console.error("Error deleting advert:", error);
      throw error;
    }
  };
}

// ................................................

export function advertDetail(advertId: string): AppThunk<Promise<void>> {
  return async function (dispatch, getState) {
    const state = getState();
    if (getAdvert(advertId)(state)) {
      return;
    }
    try {
      const advert = await getAdvertService(advertId);
      dispatch(advertsDetailFulFilled(advert));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export function advertsCreate(advertContent: FormData): AppThunk<Promise<Advert>> {
  return async function (dispatch) {
    try {
      const createdAdvert = await createAdvert(advertContent);
      const advert = await getAdvertService(createdAdvert.id.toString());
      dispatch(advertsCreatedFulfilled(advert));
      return advert;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

// ................................................

export function tagsLoaded(): AppThunk<Promise<void>> {
  return async function (dispatch) {
    try {
      const tags = await getTags();
      dispatch({ type: "tags/loaded/fulfilled", payload: tags });
    } catch (error) {
      console.error("Error loading tags:", error);
      throw error;
    }
  };
}

//Acción para resetear errores de UI============================================================================================
/**
 * Limpia errores en la interfaz, útil después de mostrar mensajes de error al usuario.
 */
export const uiResetError = (): UiResetError => ({
  type: "ui/reset-error",
});

//Unificacion de Acciones----------------------------------------------------------------
/**
 * Agrupa todos los tipos de acciones posibles en un solo tipo (Actions),
 * usado para tipar correctamente el dispatch y los reducers.
 */
export type Actions = AuthLoginPending | AuthLoginFulfilled | AuthLoginRejected | AuthLogout | AdvertsLoadedFulFilled | AdvertsDetailFulFilled | AdvertsCreatedFulFilled | AdvertsDeletedFulfilled | TagsLoadedFulfilled | UiResetError;
