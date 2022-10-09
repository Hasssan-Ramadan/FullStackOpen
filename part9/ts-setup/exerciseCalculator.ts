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

const inputs: number[] = process.argv.slice(2).map(arg => Number(arg))

console.log(calculateExercises(inputs[0], inputs.slice(1)))