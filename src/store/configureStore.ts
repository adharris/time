
import { createStore, applyMiddleware } from 'redux'
import ThunkMiddleware from 'redux-thunk';

import { RootReducer, RootState } from './reducers';
import { apiMiddleware } from 'redux-api-middleware';
import { LogMiddleware } from './middleware';

export function configureStore(preloadedState?: RootState) {
    return createStore(RootReducer, preloadedState, applyMiddleware(
        ThunkMiddleware,
        apiMiddleware,
        LogMiddleware,
    ));
}
