import express from 'express';
import patientService from '../services/patientService';
import { NewPatient, Patient } from './../types';
import toNewPatientEntry from '../util';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  try {
  const id = req.params.id;
  const patient: Patient = patientService.getEntry(id);
  res.json(patient);
  }catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient: NewPatient = patientService.addEntry(newPatientEntry);
    res.json(newPatient);
  }catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
