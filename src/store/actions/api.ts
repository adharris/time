

import { normalize, Schema } from 'normalizr';
import { APICallProperties, RSAA, ApiSuccessTypeDescriptior } from 'redux-api-middleware';


export function createApiRequest<S>(params: APICallProperties<S>) {
    return {[RSAA]: params};
}


export function normalizeResult<State>(type: string | symbol, schema: Schema): ApiSuccessTypeDescriptior<State> {
    return {
        type: type,
        payload: (action, state, response) => {
            return response.json().then(json => normalize(json, schema));
        }
    }
}