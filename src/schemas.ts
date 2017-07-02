
import { schema } from 'normalizr';

export const programSchema = new schema.Entity('programs');
export const staffSchema = new schema.Entity('staff');
staffSchema.define({
    approves: [staffSchema],
    approved_by: [staffSchema],
});

export const codeSchema = new schema.Entity('codes');
