const express = require('express');
import { Request, Response } from 'express';
const bodyParser = require('body-parser')

const calcRouter = require('./BMICalcController')
const exRouter = require('./dailyExController')

const app = express();

app.use(bodyParser.json())

app.get('/hello', (_req: Request, res: Response) => {
 res.send('Hello Full Stack!');
});

app.use('/bmi', calcRouter)
app.use('/exercises', exRouter)
const PORT = 3002;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});