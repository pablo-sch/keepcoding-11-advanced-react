//DEPENDENCIES
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";
import type { createBrowserRouter } from "react-router";
import * as thunk from "redux-thunk";

//REACT
import * as adverts from "../pages/advert/service";
import * as auth from "../pages/auth/service";

//REDUX
import type { Actions } from "./actions";
import * as reducers from "./reducer";

// Combinación de reducers-------------------------------------------------------------------------------------------------------
const rootReducer = combineReducers(reducers);
type Router = ReturnType<typeof createBrowserRouter>;

export type ExtraArgument = {
  api: { auth: typeof auth; adverts: typeof adverts };
  router: Router;
};

// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const timestamp = (store) => (next) => (action) => {
  const nextAction = {
    ...action,
    meta: {
      ...action.meta,
      timestamp: new Date(),
    },
  };
  return next(nextAction);
};

// @ts-expect-error: any
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const failureRedirects = (router: Router) => (store) => (next) => (action) => {
  const result = next(action);
  if (!action.type.endsWith("/rejected")) {
    return result;
  }

  if (action.payload.status === 404) {
    router.navigate("/not-found");
  }

  if (action.payload.status === 401) {
    router.navigate("/login");
  }

  if (action.payload.code === "ERR_NETWORK") {
    router.navigate("/internal-server-error");
  }
};

// Configuración del store-----------------------------------------------------------------------------------------------------
export default function configureStore(preloadedState: Partial<reducers.State>, router: Router) {
  const store = createStore(
    rootReducer,
    preloadedState as never,
    // // // @ts-expect-error: import devtools extension
    // // window.__REDUX_DEVTOOLS_EXTENSION__ &&
    // //   // @ts-expect-error: import devtools extension
    // //   window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeWithDevTools(
      applyMiddleware(
        thunk.withExtraArgument<reducers.State, Actions, ExtraArgument>({
          api: { adverts, auth },
          router,
        }),
        timestamp,
        failureRedirects(router)
      )
    )
  );
  return store;
}

// Tipos para TypeScript-------------------------------------------------------------------------------------------------------
export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];

// Hooks personalizados y tipados----------------------------------------------------------------------------------------------
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Tipo AppThunk para acciones asíncronas---------------------------------------------------------------------------------------
export type AppThunk<ReturnType = void> = thunk.ThunkAction<ReturnType, RootState, ExtraArgument, Actions>;
