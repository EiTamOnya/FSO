import React from 'react';

interface coursePart {
  name: string,
  exerciseCount: number
}

const Content = ({ courseParts }: { courseParts: coursePart[] }) => {
  return (
    <>
    {courseParts.map(part =>
    <p key={part.name}> {part.name} {part.exerciseCount}</p>)}
    </>
  )
};

export default Content;
