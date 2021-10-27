interface MultiplyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (height: number, weight: number): string => {
  
  const bmi: number = weight / (height/100 * height/100);
  
  if (bmi <= 18.4){
    return 'Underweight (unhealthy weight)';
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    return 'Normal (healthy weight)'
  }
  return 'Overweight (unhealthy weight)'

}

const args = parseArguments(process.argv)

console.log(calculateBmi(args.height, args.weight))
