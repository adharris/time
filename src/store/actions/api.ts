

import { normalize, Schema } from 'normalizr';
import { RSAAConfig, RSAA, SuccessTypeDescriptor, RSAAction } from 'redux-api-middleware';


export function createApiRequest<S>(params: RSAAConfig<S>): RSAAction {
    // tslint:disable-next-line:no-any
    return {[RSAA]: params} as any;
}


export function normalizeResult<State>(type: string | symbol, schema: Schema): SuccessTypeDescriptor<State> {
    return {
        type: type,
        payload: (action, state, response) => {
            return response.json().then(json => normalize(json, schema));
        }
    };
}