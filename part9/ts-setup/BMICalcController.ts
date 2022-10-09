const calcRouter = require('express').Router()
import { Request, Response } from 'express';

const calculateBmi = (height: number, weight: number): string => {
 if (isNaN(height) || isNaN(weight)) {
  throw new Error('malformatted parameters')
 }
 const bmi: number = (weight) / (Math.pow((height / 100), 2))
 if (bmi < 25) return 'Normal (healthy weight)'
 else if (bmi >= 25 && bmi <= 29) return 'Overweight (not healthy weight)'
 else return 'Obese (not healthy weight)'
}

calcRouter.get('/', (req: Request, res: Response) => {
 console.log(req.query)
 try {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  const bmi = calculateBmi(height, weight)
  res.json({ weight, height, bmi })
 } catch (error: unknown) {
  if (error instanceof Error) {
   res.json({ error: error.message })
  }
 }
})

module.exports = calcRouter