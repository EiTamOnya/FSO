import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData;

const getEntries = (): Diagnose[] => {
  return diagnoses;
};

const addEntry = (diagnosis: Diagnose): Diagnose => {
  return diagnosis;
};

export default {
  getEntries,
  addEntry,
};