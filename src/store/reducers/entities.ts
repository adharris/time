
import { Action } from 'redux';
import { Program, NormalizedStaff, Staff } from 'models';
import { merge } from 'lodash';

import { ADD_APPROVER } from '../actions';


type IdMap<T> = {[id: number]: T};

export interface EntityState {
    programs: IdMap<Program>;
    staff: IdMap<NormalizedStaff>;
}

const initialState: EntityState = {
    programs: {},
    staff: {},
};


export interface EntityAction extends Action {
    payload: {
        entities: Partial<EntityState>;
    };
}


function isEntityAction(action: Action): action is EntityAction {
    // tslint:disable-next-line:no-string-literal
    return !!action['payload'] && !!action['payload']['entities'];
}

export function entitiesReducer(state: EntityState = initialState, action: Action) {
    if (isEntityAction(action)) {
        return merge({}, state, action.payload.entities);
    }

    switch (action.type) {

        case ADD_APPROVER:
            return addApprover(state, action);

        default:
            return state;
    }
}

function addApprover(state: EntityState, action: Action): EntityState {
    let approver: Staff = action['payload']['approver'];
    let target: Staff = action['payload']['canApprove'];

    return {
        ...state,
        staff: {
            ...state.staff,
            [approver.id]: {
                ...state.staff[approver.id],
                approves: [...state.staff[approver.id].approves || [], target.id],
            },
            [target.id]: {
                ...state.staff[target.id],
                approved_by: [...state.staff[target.id].approved_by || [], approver.id],
            },
        }
    };
}
