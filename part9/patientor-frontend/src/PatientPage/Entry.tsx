import React from "react";
import {Icon, SemanticICONS, SemanticCOLORS } from 'semantic-ui-react';
import { useStateValue } from "../state";
import { Entry } from '../types';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{diagnoses}, ] = useStateValue();
  const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };
  
  
  const BasicEntry: React.FC<{ iconName: SemanticICONS }> = ({ iconName }) =>{
    return (
      <div>
        <h1>{entry.date} <Icon name={iconName}/></h1>
        <i>{entry.description}</i>
        <ul>
          {entry.diagnosisCodes?.map(code =>
            <li key={code}>{code} {Object.values(diagnoses).find(d => d.code === code)?.name}</li>
          )}
        </ul>
      </div>
    );
  };

  const entryStyle = {
    border: 'solid #dedcdc 2px',
    borderRadius: '4px',
    padding: '8px',
    marginBottom: '16px',
    boxShadow: '1px 1px #dedcdc'
  };

  
  
  const getIconColor = (index: number): SemanticCOLORS => {
    const colors: SemanticCOLORS[] = ['green', 'yellow', 'orange', 'red'];
    return colors[index];
  };
  
  switch(entry.type) {
      case 'HealthCheck':
        
        
        return (
          <div style={entryStyle}>
          <BasicEntry iconName={'user md'} />
          {console.log()}
          {console.log()}
          <Icon name={'heart'} color={getIconColor(entry.healthCheckRating)} />
          </div>
        );
      case 'OccupationalHealthcare' :
        return (
          <div style={entryStyle}>
          <BasicEntry iconName={'stethoscope'} />
          </div>
        );
      case 'Hospital':
        return (
          <div style={entryStyle}>
          <BasicEntry iconName={'hospital'} />
          </div>
        );
      default:
        return assertNever(entry);
    }
};

export default EntryDetails;