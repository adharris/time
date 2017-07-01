
import { createApiRequest, normalizeResult } from './api';

import { staffSchema, codeSchema } from '../../schemas';
import { RootState } from '../reducers';

const MockDataURL = '/data.json';

export const LOAD_MOCK_DATA = 'LOAD_MOCK_DATA';
export const LOAD_MOCK_DATA_SUCCESS = 'LOAD_MOCK_DATA_SUCCESS';
export const LOAD_MOCK_DATA_FAILURE = 'LOAD_MOCK_DATA_FAILURE';


export function loadMockData() {
    return createApiRequest({
        endpoint: MockDataURL,
        types: [
            LOAD_MOCK_DATA, 
            normalizeResult(LOAD_MOCK_DATA_SUCCESS, {
                staff: [staffSchema],
                codes: [codeSchema],
            }),
            LOAD_MOCK_DATA_FAILURE],
        method: 'GET',
        bailout: (state: RootState) => Object.keys(state.entities.staff).length > 0,
    });
}
