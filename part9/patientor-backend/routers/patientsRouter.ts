import { Router } from "express";
import { addPatient, getPatientById, getPatientsWithoutSSN } from "../services/patients";

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
 res.send(getPatientsWithoutSSN())
})

patientsRouter.post('/', (req, res) => {
 res.send(addPatient(req.body))
})

patientsRouter.get('/:id', (req, res) => {
 const patientId = req.params.id
 res.send(getPatientById(patientId))
})

export default patientsRouter