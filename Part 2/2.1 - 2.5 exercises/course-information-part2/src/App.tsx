import { Header, Content, Total } from "./components.jsx";

//Page Data:

const courses = [
  {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  },
  {
    name: "Node.js",
    id: 2,
    parts: [
      {
        name: "Routing",
        exercises: 3,
        id: 1,
      },
      {
        name: "Middlewares",
        exercises: 7,
        id: 2,
      },
    ],
  },
];

//Data Variables:

const halfStackName = courses[0].name;

const nodeJsName = courses[0].name;

const halfStackParts = courses[0].parts;

const nodeJsParts = courses[1].parts;

const course1 = halfStackParts.map((i) => {
  return i.name;
});

const course2 = nodeJsParts.map((i) => {
  return i.name;
});

const exercises1 = halfStackParts.map((i) => {
  return i.exercises;
});

const exercises2 = nodeJsParts.map((i) => {
  return i.exercises;
});

//Root Elements:
const Course = () => {
  return (
    <>
      <Header CorseName={halfStackName} />
      <Content courseNames={course1} exercises={exercises1} />
      <Total total={exercises1} />

      <Header CorseName={nodeJsName} />
      <Content courseNames={course2} exercises={exercises2} />
      <Total total={exercises2} />
    </>
  );
};

function App() {
  return (
    <div>
      <Course />
    </div>
  );
}

export default App;
