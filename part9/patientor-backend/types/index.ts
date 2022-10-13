export interface Diagnose {
 code: string;
 name: string;
 latin?: string;
}

export interface BaseEntry {
 id: string;
 description: string;
 date: string;
 specialist: string;
 diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
 "Healthy" = 0,
 "LowRisk" = 1,
 "HighRisk" = 2,
 "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
 type: "HealthCheck";
 healthCheckRating: HealthCheckRating;
}

export interface Discharge {
 date: string;
 criteria: string;
}

export interface HospitalEntry extends BaseEntry {
 type: "Hospital";
 discharge: Discharge;
}

export interface SickLeave {
 startDate: string;
 endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
 type: "OccupationalHealthcare";
 employerName: string;
 sickLeave?: SickLeave;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry

export enum Gender {
 male = "male",
 female = "female",
 other = "other"
}

export interface Patient {
 id: string;
 name: string;
 ssn: string;
 occupation: string;
 gender: Gender;
 dateOfBirth: string;
 entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type newPatient = Omit<Patient, 'id'>