interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

type Rating  = {
  rating: number,
  ratingDescription: string
};

interface Args {
  days: number [];
  target: number;
}

const parseArgumentsCalc = (args: Array<string>): Args => {
  // make sure at least one day and target are provided
  if (args.length < 5) throw new Error('Not enough arguments');


  if (isNaN(Number(args[2]))) throw new Error('Provided values were not numbers!');

  const days: number[] = [];
  // get only the args needed for the array of days
  for (let i = 3; i < args.length; i++){
    if(!isNaN(Number(args[i]))) {
      days.push(Number(args[i]));
    } else {
    throw new Error('Provided values were not numbers!');
    }
  }
  
  return {
      days: days,
      target: Number(args[2])
    };
};



const calculateRating = (average: number, target: number): Rating => {
  if (average >= target){
    return {rating: 3, ratingDescription: 'very good'};
  } else if (Math.round(average) === target){
    return {rating: 2, ratingDescription: 'not too bad but could be better'};
  }
  return {rating: 1, ratingDescription: 'not good'};
};

const calculateExercises  = (days: number[], target: number): Result => {
  const periodLength: number = days.length;
  const trainingDays: number = days.filter(day => day !== 0).length;
  const average: number = days.reduce(function (sum, value) {
        return sum + value;
    }, 0) / periodLength;
  const rating: number = calculateRating(average, target).rating;
  const success: boolean = rating === 3 ? true : false;
  const ratingDescription: string = calculateRating(average, target).ratingDescription;
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const argsCalc = parseArgumentsCalc(process.argv);

console.log(calculateExercises(argsCalc.days, argsCalc.target));
