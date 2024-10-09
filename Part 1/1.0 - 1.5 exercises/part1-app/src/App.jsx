const Header = course => {

  return <>
    <h1>{course.name}</h1>
  </>
}



const Content = (exercise) =>{
  return(
    <>
    <br />
    <h2>Course Content:</h2>
    <p><b>{exercise.name1}</b>:</p><p> {exercise.number1} Exercises </p>
    <p><b>{exercise.name2}</b>:</p><p> {exercise.number2} Exercises </p>
    <p><b>{exercise.name3}</b>:</p><p> {exercise.number3} Exercises </p>
    </>
  )
}

const Total = (props) =>{
  return (
    <>
    <br />
    <h3>Total Number of Exercises: {props.total}</h3>
    </>
  )
}

const data =[{name: 'Half Stack application development',

                  parts: [
                    {
                      name1: 'Fundamentals of React',
                      exercise1: 10
                    },
                    {
                      name2: 'Using props to pass data',
                      exercise2: 7
                    },
                    {
                      name3: 'State of a component',
                      exercise3: 14
                    }
                  ]
                }]

const courseName = data[0].name;
const parts = data[0].parts;

const name1 = parts[0].name1;
const number1 = parts[0].exercise1;
console.log('1st Exercise:',name1, number1)
const name2 = parts[1].name2;
const number2 = parts[1].exercise2;
console.log('2nd Exercise:',name2, number2)
const name3 = parts[2].name3;
const number3 = parts[2].exercise3;
console.log('3rd Exercise:',name3, number3)

const total = number1 + number2 + number3; 

function App() {
  
  
  return (
   <div>
    <Header name={courseName} />
    <Content name1={name1} number1= {number1} name2={name2} number2={number2} name3={name3} number3={number3} />
    <Total total={total}/>
   </div>
  )
}

export default App
