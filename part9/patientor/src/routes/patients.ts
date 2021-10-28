import { newPatient } from './../types';
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatient: newPatient = patientService.addEntry(req.body);
  res.json(newPatient);
});

export default router;
