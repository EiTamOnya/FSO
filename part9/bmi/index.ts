import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();


app.get('/bmi', (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.height))) {
    res.send({
    error: 'malformatted parameters'
  });
  }
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  const bmi: string = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi,
  });
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});