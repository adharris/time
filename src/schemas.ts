
import { schema } from 'normalizr';

export const programSchema = new schema.Entity('programs');
export const staffSchema = new schema.Entity('staff');
staffSchema.define({supervisor: staffSchema});


export const codeSchema = new schema.Entity('codes', {
    
}, {
    idAttribute: (code) => code.name + code.category
});