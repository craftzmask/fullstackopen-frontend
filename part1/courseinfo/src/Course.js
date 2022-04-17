const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => <div>{parts.map(part => <Part key={part.id} part={part} />)}</div>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Course = ({ course }) => {
  const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course