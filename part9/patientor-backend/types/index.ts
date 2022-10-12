export enum Gender {
 male = "male",
 female = "female",
 other = "other"
}

export type Diagnose = {
 code: string;
 name: string;
 latin?: string;
}

export interface Entry {
}

export interface Patient {
 id: string;
 name: string;
 ssn: string;
 occupation: string;
 gender: Gender;
 dateOfBirth: string;
 entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type newPatient = Omit<Patient, 'id'>