import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Inputs as RequestBody, Result } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.height))) {
    res.send({
    error: 'malformatted parameters'
  });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
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

app.post('/exercises', (req, res) => {
  const body: RequestBody = req.body as RequestBody;
  if (!body.daily_exercises || !body.target) {
    res.send({
        error: "parameters missing"
      });
  }
  body.daily_exercises.forEach(exercise => {
    if (isNaN(exercise)) {
      res.send({
        error: "malformatted parameters"
      });
    }
  });
  const result: Result = calculateExercises(body.daily_exercises, body.target);
  res.send({
    result
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});