const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

const calculateBmi = (height: number, weight: number): string => {
 if (isNaN(height) || isNaN(weight)) {
  throw new Error('eighter height or weight is not a number')
 }
 const bmi: number = (weight) / (Math.pow((height / 100), 2))
 if (bmi < 25) return 'Normal (healthy weight)'
 else if (bmi >= 25 && bmi <= 29) return 'Overweight (not healthy weight)'
 else return 'Obese (not healthy weight)'
}

try {
 console.log(calculateBmi(height, weight))
} catch (error: unknown) {
 if (error instanceof Error) {
  console.log(`Error: ${error.message}`)
 }
}