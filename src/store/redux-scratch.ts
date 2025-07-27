// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck: no check this file

/**
 * Este código crea un store personalizado que mantiene el estado,
 * permite despachar acciones para modificarlo mediante un reducer,
 * y permite a otras funciones suscribirse para ser notificadas de los cambios.
 */
export function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  dispatch({ type: "INIT" });

  return {
    getState,
    dispatch,
    subscribe,
  };
}
