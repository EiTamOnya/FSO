import patientsData from '../../data/patients';
import { PublicPatient , Patient, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';

const id = uuid();
const patients: Patient[] = patientsData;

const getEntries = (): PublicPatient [] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getEntry = (id: string): Patient => {
  const patient = patients.find(patient => patient.id === id);
  if (patient === undefined) {
    throw new Error('Unable to find patient id.');
  }
  return patient;
};

const addEntry = (patient: NewPatient): Patient => {
  return {
    id: id,
    entries: [],
    ...patient
  };
};

export default {
  getEntries,
  addEntry,
  getEntry
};