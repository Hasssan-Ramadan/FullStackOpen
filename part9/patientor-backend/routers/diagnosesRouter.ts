import { Router } from "express";
import { getDaignoses } from "../services/diagnoses";

const diagnosesRouter = Router()

diagnosesRouter.get('/', (_req, res) => {
 res.send(getDaignoses())
})

export default diagnosesRouter