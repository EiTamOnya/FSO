import { Entry } from './../types';
import patients from '../../data/patients';
import { PublicPatient, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getEntry = (id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient === undefined) {
    throw new Error('Unable to find patient id.');
  }
  return patient;
};

const addEntry = (patient: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    entries: [],
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addNewEntry = (entry: Entry, id: string): Entry => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient === undefined) {
    throw new Error('Unable to find patient id.');
  }
  patients.forEach((patient) => {
    if (patient.id === id) {
      patient.entries.push(entry);
    }
    return entry;
  });
  return entry;
};

export default {
  getEntries,
  addEntry,
  getEntry,
  addNewEntry,
};
