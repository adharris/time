
import 'isomorphic-fetch';

const DirectoryURL = 'https://dev-data.youthbuild.org/api/program/directory';

import { normalize } from 'normalizr';
import { programSchema } from '../schemas'

export interface Program {
    name: string;
    id: number;
    city: string;
    state: string;
}

export function loadPrograms(): Promise<Program[]> {
    return fetch(DirectoryURL, {mode: 'cors'})
        .then(result => result.json())
        .then(result => result.programs)
        .then(p => {
            console.log(p);
            console.log(normalize(p, [programSchema]));
            return p;
        })
        .catch(() => []);
}
