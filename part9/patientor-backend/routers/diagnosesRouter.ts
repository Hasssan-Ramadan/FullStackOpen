import { Router } from "express";
import diagnoses from "../services/diagnoses";

const diagnosesRouter = Router()

diagnosesRouter.get('/', (_req, res) => {
 res.send(diagnoses)
})

export default diagnosesRouter