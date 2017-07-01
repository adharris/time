
import { Action } from 'redux';

import { Program, Staff } from "models";

import { merge } from 'lodash';

type IdMap<T> = {[id: number]: T}

export interface EntityState {
    programs: IdMap<Program>;
    staff: IdMap<Staff>;
}

const initialState: EntityState = {
    programs: {},
    staff: {},
}


export interface EntityAction extends Action {
    payload: {entities: Partial<EntityState>; }
}


function isEntityAction(action: Action): action is EntityAction {
    return !!action['payload'] && !!action['payload']['entities'];
}

export function entitiesReducer(state = initialState, action: Action) {
    if (isEntityAction(action)) {
        return merge({}, state, action.payload.entities);
    } else {
        return state;
    }
}
