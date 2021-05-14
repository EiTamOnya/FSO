import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Content = ({ course }) => {
    return (
        <div>
            {
                course.parts.map(part =>
                    <Part part={part} key={part.id} />
                )
            }
        </div>
    )
}

const Total = ({ course }) => {
    return (
        <p><strong>Number of exercises {course.parts.reduce(
            (accumulator, currentValue) => accumulator + currentValue.exercises,
            0
        )}</strong></p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}
export default Course