import React from 'react';
import { CoursePart } from '../types';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

    const PartHeader = () => {
      return (
          <div>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          </div>
        )
    }
    switch(coursePart.type) {
      case 'normal':
        return (
          <>
          <PartHeader />
          <p>{coursePart.description}</p>
          </>
        )
      case 'groupProject' :
        return (
          <div>
          <PartHeader />
          <p>Project exercises: {coursePart.groupProjectCount}</p>
          </div>
          )
      case 'submission':
        return (
          <div>
          <PartHeader />
          <p>{coursePart.description}</p>
          <p>Submit to: {coursePart.exerciseSubmissionLink}</p>
          </div>
        )
      case 'special':
        return (
          <div>
          <PartHeader />
          <p>{coursePart.description}</p>
          <p>Required skill: {coursePart.requirements.join(', ')}</p>
          </div>
        )
      default:
        return assertNever(coursePart)
    }
  };

export default Part;
