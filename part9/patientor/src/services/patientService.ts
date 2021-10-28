import patientsData from '../../data/patients';
import { NonSensitivePatient, Patient, newPatient } from '../types';
import {v1 as uuid} from 'uuid';

const id = uuid();
const patients: NonSensitivePatient[] = patientsData;

const getEntries = (): NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (patient: newPatient): Patient => {
  return {
    id: id,
    ...patient
  };
};

export default {
  getEntries,
  addEntry,
};