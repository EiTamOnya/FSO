import express from 'express';
import diagnoseService from '../services/diagnoseService';
import {toNewDiagnosisEntry, DiagnosisFields} from '../util';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

router.post('/', (req, res) => {
  try{
    const body: DiagnosisFields = req.body as DiagnosisFields;
    const newDiagnosisEntry = toNewDiagnosisEntry(body);
    res.send(diagnoseService.addEntry(newDiagnosisEntry));
  }catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default router;
