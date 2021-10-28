import patientsData from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';

const id = uuid();
const patients: Patient[] = patientsData;

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (patient: NewPatient): Patient => {
  return {
    id: id,
    ...patient
  };
};

export default {
  getEntries,
  addEntry,
};