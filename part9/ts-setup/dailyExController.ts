const exRouter = require('express').Router()
import { Request, Response } from 'express';

interface calcResult {
 periodLength: number,
 trainingDays: number,
 success: boolean,
 rating: number,
 ratingDescription: string,
 target: number,
 average: number
}

const calculateExercises = (target: number, dailyExerciseHours: number[]): calcResult => {
 let periodLength = dailyExerciseHours.length
 let trainingDays = dailyExerciseHours.filter(day => day !== 0).length
 let success = trainingDays !== 0
 let hoursSum = 0
 for (let exHours of dailyExerciseHours) {
  hoursSum += exHours
 }
 let rating: number, ratingDescription: string
 let average = hoursSum / dailyExerciseHours.length
 if (average < 2) {
  rating = 1
  ratingDescription = 'not so bad; you have more to do'
 }
 else if (average === 2) {
  rating = 2
  ratingDescription = 'good enough'
 }
 else {
  rating = 3
  ratingDescription = 'excellent!'
 }
 return { periodLength, trainingDays, success, rating, ratingDescription, target, average }
}

exRouter.post('/', (req: Request, res: Response) => {
 const target: number = req.body.target
 const daily_exercises: number[] = req.body.daily_exercises

 if (target === undefined || typeof target !== 'number' || daily_exercises === undefined || !Array.isArray(daily_exercises))
  res.json({ error: "malformatted parameters" })
 for (let i = 0; i < daily_exercises.length; i++) {
  if (typeof daily_exercises[i] !== 'number')
   res.json({ error: "malformatted parameters" })
 }

 try {
  const result = calculateExercises(target, daily_exercises)
  res.json(result)
 } catch (error) {
  res.json({ error: error.message })
 }
})

module.exports = exRouter