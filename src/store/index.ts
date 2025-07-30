import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";
import * as thunk from "redux-thunk";

import * as adverts from "../pages/advert/service";
import * as auth from "../pages/auth/service";

import type { Actions } from "./actions";
import * as reducers from "./reducer";

// Combinación de reducers-------------------------------------------------------------------------------------------------------
const rootReducer = combineReducers(reducers);
type ExtraArgument = { api: { auth: typeof auth; adverts: typeof adverts } };

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

// Configuración del store-----------------------------------------------------------------------------------------------------
export default function configureStore(preloadedState: Partial<reducers.State>) {
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
        }),
        timestamp
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
