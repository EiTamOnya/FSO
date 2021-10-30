import { NewPatient, Gender, Diagnose } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
 if (!text || !isString(text)) {
    throw new Error('Incorrect or missing field');
  }

  return text;
};

const isDate = (date: string): boolean => {
 return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};


type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {

  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  };

  return newEntry;
};

export type DiagnosisFields = { code : unknown, name: unknown, latin: unknown };


export const toNewDiagnosisEntry = ({ code, name, latin}: DiagnosisFields): Diagnose => {

  const newEntry: Diagnose = {
    code: parseString(code),
    name: parseString(name),
    
  };

  if (latin && latin !== undefined){
    newEntry.latin = parseString(latin);
  }

  return newEntry;
};

export default toNewPatientEntry;
