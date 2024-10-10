//React Components:

const Header = (para) => {
    return (
      <>
        <h1>{para.CorseName}</h1>
      </>
    );
  };
  
  
  const Content = (props) => {
    return <>
    <table id="CourseContent">
      <thead>
        <tr>
          <td width='300px'>{props.courseNames.map((number, index) => (
          <p key={index}> {number}</p>
        ))}</td>
        <td>{props.exercises.map((number, index) => (
          <p key={index}> {number}</p>
        ))}</td>
        </tr>
      </thead>
    </table>
    
    </>;
  };
  
  const Total= (a) =>{
    return(
      <div>
        <p><b>Total Exercises: </b>{a.total.reduce((acc, curr) => acc + curr, 0)}</p>
      </div>
    )
  }
  
  
  

export{
  Header,
  Content,
  Total
};
