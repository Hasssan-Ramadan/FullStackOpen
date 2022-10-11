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

export type Patient = {
 id: string;
 name: string;
 dateOfBirth: string;
 ssn: string;
 gender: Gender;
 occupation: string;
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>

export type newPatient = Omit<Patient, 'id'>