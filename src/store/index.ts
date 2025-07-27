import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";
import * as thunk from "redux-thunk";

import type { Actions } from "./actions";
import * as reducers from "./reducer";

// Combinación de reducers-------------------------------------------------------------------------------------------------------
/**
 * Une todos los reducers importados en un solo reducer raíz para que Redux maneje el estado global.
 */
const rootReducer = combineReducers(reducers);

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
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument<reducers.State, Actions>(), timestamp))
  );
  return store;
}

// Tipos para TypeScript-------------------------------------------------------------------------------------------------------
/**
 * Define tipos útiles para trabajar con el store y su estado en TypeScript,
 * mejorando autocompletado y seguridad.
 */
export type AppStore = ReturnType<typeof configureStore>;
export type AppGetState = AppStore["getState"];
export type RootState = ReturnType<AppGetState>;
export type AppDispatch = AppStore["dispatch"];

// Hooks personalizados y tipados----------------------------------------------------------------------------------------------
/**
 * Versiones tipadas de los hooks useDispatch y useSelector de React-Redux para usar en componentes con tipado seguro.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Tipo AppThunk para acciones asíncronas---------------------------------------------------------------------------------------
/**
 * Tipo que se usa para definir acciones asíncronas (thunks) con acceso al estado y a las acciones definidas,
 * mejorando el tipado en toda la app.
 */
export type AppThunk<ReturnType = void> = thunk.ThunkAction<ReturnType, RootState, undefined, Actions>;
