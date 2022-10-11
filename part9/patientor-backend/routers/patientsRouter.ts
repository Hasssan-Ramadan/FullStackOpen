import { Router } from "express";
import { addPatient, getPatientsWithoutSSN } from "../services/patients";

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
 res.send(getPatientsWithoutSSN())
})

patientsRouter.post('/', (req, res) => {
 res.send(addPatient(req.body))
})

export default patientsRouter