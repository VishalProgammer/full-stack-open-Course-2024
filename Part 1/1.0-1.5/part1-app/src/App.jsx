const Header = course => {

  return <>
    <h1>{course}</h1>
  </>
}

const Part  = (exercise) => {
  return(
    <>
    <p>{exercise.name}: {exercise.number} Exercises </p>
    </>
  )

}

const Content = () =>{
  return(
    <>
    <br />
    <Part />
    <Part />
    <Part />
    </>
  )
}

const Total = () =>{
  return (
    <>
    <br />
    <h3>Total Number of Exercises: 31</h3>
    </>
  )
}

function App() {
  const course =[{name: 'Half Stack application development',

                  parts: [
                    {
                      name: 'Fundamentals of React',
                      exercises: 10
                    },
                    {
                      name: 'Using props to pass data',
                      exercises: 7
                    },
                    {
                      name: 'State of a component',
                      exercises: 14
                    }
                  ]
                }]
  return (
   <div>
    <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
   </div>
  )
}

export default App
