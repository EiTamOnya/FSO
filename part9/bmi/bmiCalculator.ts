const calculateBmi = (height: number, weight: number): string => {
  
  const bmi: number = weight / (height/100 * height/100);
  
  if (bmi <= 18.4){
    return 'Underweight (unhealthy weight)';
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    return 'Normal (healthy weight)'
  }
  return 'Overweight (unhealthy weight)'

}

console.log(calculateBmi(180, 74))