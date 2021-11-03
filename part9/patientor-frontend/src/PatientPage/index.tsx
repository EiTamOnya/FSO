import React, { useEffect, useState } from "react";
import axios from "axios";
import {Icon} from 'semantic-ui-react';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, setPatientAction } from "../state";
import EntryDetails from "./Entry";
import AddEntryForm from "./AddEntryForm";
import { Entry } from "../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{patients}, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>(Object.values(patients).find(p => p.id === id));
  
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientAction(patient));
        setPatient(patient);
      } catch (e) {
        console.error(e);
      }
    };
    if (patient === undefined || !('ssn' in patient)){
      void fetchPatient();
    }
  }, [dispatch]);

  const iconName = patient?.gender === 'male' ? 'mars' : 'venus'; 

  const submitNewEntry = async (values: Entry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      const updatedPatient = {
        ...patient,
        entries: patient?.entries?.concat(newEntry)
      } as Patient;
      dispatch(setPatientAction(updatedPatient));
      setPatient(updatedPatient);
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };
  
  return (
    <div className="App">
      <h1>{patient?.name}<Icon name={iconName}/></h1> 
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h3>entries</h3>
      {console.log(typeof patient)}
      {patient?.entries?.map(entry => 
  
      <EntryDetails key={entry.id} entry={entry}/>
        )}
      <AddEntryForm onSubmit={submitNewEntry} />
    </div>
  );
};

export default PatientPage;
