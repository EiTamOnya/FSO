import { NewPatient, Gender, Diagnose, Entry, BaseEntry, sickLeave } from './types';

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

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number';
};

const parseNumber = (param: unknown): number => {
  if (!param || !isNumber(param)) {
    throw new Error('Incorrect or missing field');
  }
  return param;
};

const parseDiagnosisCodes = (codes: unknown): string[] | undefined => {
  if (codes instanceof Array) {
    codes.forEach((code) => {
      if (!code || !isString(code)) {
        throw new Error('Incorrect or missing field');
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return codes;
  }
  throw new Error('Incorrect or code missing field');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (param: any): sickLeave | undefined | void => {
  if (param instanceof Object) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (Object.keys(param).includes('startDate') && Object.keys(param).includes('endDate')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      for (const value of Object.values(param)) {
        if (typeof value === 'string') {
          parseDate(value);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return param;
    }
  } else {
    throw new Error('Incorrect or sick leave missing field');
  }
};

type Fields = { name: unknown; dateOfBirth: unknown; ssn: unknown; gender: unknown; occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
  };

  return newEntry;
};

export type DiagnosisFields = { code: unknown; name: unknown; latin: unknown };

export const toNewDiagnosisEntry = ({ code, name, latin }: DiagnosisFields): Diagnose => {
  const newEntry: Diagnose = {
    code: parseString(code),
    name: parseString(name),
  };

  if (latin && latin !== undefined) {
    newEntry.latin = parseString(latin);
  }

  return newEntry;
};

export type EntryFields = {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  type: unknown;
  healthCheckRating: unknown;
  sickLeave: unknown;
  employerName: unknown;
  discharge: unknown;
};

export const toNewEntry = ({
  id,
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
  sickLeave,
  employerName,
  discharge,
}: EntryFields): Entry => {
  const newEntry: BaseEntry = {
    id: parseString(id),
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
  };

  if (diagnosisCodes && diagnosisCodes !== undefined) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  switch (type) {
    case 'HealthCheck':
      return {
        ...newEntry,
        type,
        healthCheckRating: parseNumber(healthCheckRating),
      };
    case 'OccupationalHealthcare':
      if (sickLeave && sickLeave !== undefined) {
        return {
          ...newEntry,
          type,
          employerName: parseString(employerName),
          sickLeave: parseSickLeave(sickLeave),
        };
      } else {
        return {
          ...newEntry,
          type,
          employerName: parseString(employerName),
        };
      }
    case 'Hospital':
      return {
        ...newEntry,
        type,
        discharge: discharge,
      };
    default:
      throw new Error(`Unhandled discriminated union member: ${JSON.stringify(type)}`);
  }
};

export default toNewPatientEntry;
