const express = require('express');
import { Request, Response } from 'express';

const app = express();

const calcRouter = require('./BMICalcController')

app.get('/hello', (_req: Request, res: Response) => {
 res.send('Hello Full Stack!');
});

app.use('/bmi', calcRouter)
const PORT = 3002;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});