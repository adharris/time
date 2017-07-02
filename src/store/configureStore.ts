
import { createStore, applyMiddleware } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { RootReducer, RootState } from './reducers';
import { apiMiddleware } from 'redux-api-middleware';

const logger = createLogger({
    collapsed: (getState: Function, action: {error?: boolean}) => !action.error
});


export function configureStore(preloadedState?: RootState) {
    return createStore(RootReducer, preloadedState, applyMiddleware(
        ThunkMiddleware,
        apiMiddleware,
        logger,
    ));
}
