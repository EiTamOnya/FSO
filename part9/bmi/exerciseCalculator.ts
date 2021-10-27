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
}

const calculateRating = (average: number, target: number): Rating => {
  if (average >= target){
    return {rating: 3, ratingDescription: 'very good'};
  } else if (Math.round(average) === target){
    return {rating: 2, ratingDescription: 'not too bad but could be better'}
  }
  return {rating: 1, ratingDescription: 'not good'} 
}

const calculateExercises  = (days: number[], target: number): any => {
  const periodLength: number = days.length
  const trainingDays: number = days.filter(day => day !== 0).length;
  const average: number = days.reduce(function (sum, value) {
        return sum + value;
    }, 0) / periodLength;
  const rating: number = calculateRating(average, target).rating;
  const success: boolean = true ? rating === 3 : false
  const ratingDescription: string = calculateRating(average, target).ratingDescription;
  
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
