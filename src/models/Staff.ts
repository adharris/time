

interface StaffBase {
    id: number;
    first_name: string;
    last_name: string;
}

export interface NormalizedStaff extends StaffBase {
    approves: number[];
    approved_by: number[];
}

export interface Staff extends StaffBase {
    approves: Staff[];
    approved_by: Staff[];
}