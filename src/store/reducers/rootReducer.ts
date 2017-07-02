
import { combineReducers } from 'redux';

import { entitiesReducer, EntityState } from './entities';


export interface RootState {
    entities: EntityState;
}


export const RootReducer = combineReducers<RootState>({
    entities: entitiesReducer,
});
