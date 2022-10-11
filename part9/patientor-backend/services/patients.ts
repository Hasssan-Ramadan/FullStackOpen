import { Patient, PatientWithoutSSN } from "../types";
import patientsData from "../data/patients.json"

export const patients: Patient[] = patientsData

export const patientsWithoutSSN: PatientWithoutSSN[] = patientsData.map(patient => ({ ...patient, ssn: undefined }));