
import { createApiRequest, normalizeResult } from './api';

import { programSchema } from '../../schemas';
import { RootState } from '../reducers';
    
const ProgramDirectoryURL = 'https://data.youthbuild.org/api/program/directory';

export const LOAD_PROGRAMS = 'LOAD_PROGRAMS';
export const LOAD_PROGRAMS_SUCCESS = 'LOAD_PROGRAMS_SUCCESS';
export const LOAD_PROGRAMS_FAILURE = 'LOAD_PROGRAMS_FAILURE';


export function loadPrograms() {
    return createApiRequest({
        endpoint: ProgramDirectoryURL,
        types: [
            LOAD_PROGRAMS, 
            normalizeResult(LOAD_PROGRAMS_SUCCESS, {programs: [programSchema]}),
            LOAD_PROGRAMS_FAILURE],
        method: 'GET',
        bailout: (state: RootState) => Object.keys(state.entities.programs).length > 0,
    });
}
