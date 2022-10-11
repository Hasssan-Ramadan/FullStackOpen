import { Router } from "express";
import { patientsWithoutSSN } from "../services/patients";

const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
 res.send(patientsWithoutSSN)
})

export default patientsRouter