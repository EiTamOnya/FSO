import React, { useEffect, useState } from "react";
import axios from "axios";
import {Icon} from 'semantic-ui-react';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue, setPatientAction } from "../state";
import EntryDetails from "./Entry";

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
  
  return (
    <div className="App">
      <h1>{patient?.name}<Icon name={iconName}/></h1> 
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h3>entries</h3>
      {patient?.entries?.map(entry => 
      <EntryDetails key={entry.id} entry={entry}/>
      // <div key={entry.description}>
      //   <p>{entry.date} {entry.description}</p>
      //   <ul>
      //   {entry.diagnosisCodes?.map(code =>
          
      //     <li key={code}>{code} {Object.values(diagnoses).find(d => d.code === code)?.name}</li>
      //   )}
      //   </ul>
      // </div>
        )}
    </div>
  );
};

export default PatientPage;