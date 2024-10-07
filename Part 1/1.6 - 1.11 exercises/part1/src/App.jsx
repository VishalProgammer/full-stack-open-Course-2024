import { useState } from 'react'

  //All Statistics Elements
  const StatisticsLine= (props) =>{
    return(
      <div>
        <table>
          <thead>
          <tr>
          <td  width='140px'>{props.text}</td>
          <td>{props.value}</td>
          </tr>
          </thead>
        </table>
        </div>
    )
  }

  const Statistics= (props)=>{
    const {goodCount, neutralCount,badCount, totalCount, average, percentage} = props;

    if(props.totalCount===0){
      return <>
      <p>No Feedbacks are Submitted yet. Kindly click buttons above to add reviews.</p>
      </>
    }

    return <div id='stats'>
        <StatisticsLine text={'Good Reviews:'}  value={props.goodCount}/>
        <StatisticsLine text={'Neutral Reviews:'}  value={props.neutralCount}/>
        <StatisticsLine text={'Bad Reviews:'}  value={props.badCount}/>
        <StatisticsLine text={'Total Reviews:'}  value={props.totalCount}/>
        <StatisticsLine text={'Average Positivity:'}  value={props.average}/>
        <StatisticsLine text={'Positivity:'}  value={props.percentage}/>
      </div>
  }

 //Total  Feedback
 const Total = (props) =>{

  if(props.allClicks === 0){
    return(
      <div>
        Press Any of the tree Rating Buttons to submit Feedback!!
      </div>
    )
  }
  return(
    <div>
      Total Reviews: {props.allClicks}
    </div>
  )
}

const App = () => {
    // All Stats
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allClicks, setAllClicks] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive,  setPositive] = useState(0)


  //Good Feedback
  const goodSmashed = () =>{
    const goodUpdates = good + 1;
    setGood(goodUpdates);
    //console.log(good);
    setAllClicks(neutral + goodUpdates + bad)
    const ave = (goodUpdates-bad)/(allClicks+1);
    setAverage(ave);
    setPositive((goodUpdates/(allClicks+1)*100));
  }
  const totalGood = good;


  //Neutral Feedback
  const neutralSmashed = () =>{
    const neutralUpdates =neutral + 1;
    setNeutral(neutralUpdates);
    setAllClicks(good + neutralUpdates +  bad)
    const ave  = (good-bad)/(allClicks+1);
    setAverage(ave);
    setPositive((totalGood/(allClicks+1))*100);
  }
  const totalNeutral = neutral;


  //Bad Feedback
  const badSmashed = () =>{
    const badUpdates = bad + 1;
    setBad(badUpdates);
    setAllClicks(good + badUpdates  + neutral)
    const ave = (totalGood-badUpdates)/(allClicks+1);
    setAverage(ave);
    setPositive((totalGood/(allClicks+1))*100);
  }
  const totalBad = bad;
  const percentage = positive + '%';
  console.log(percentage);
  

  return (
    <div>
      <h1>Feedback Page</h1>
      <button onClick={goodSmashed}>Good</button>
      <button onClick={neutralSmashed}>Neutral</button>
      <button  onClick={badSmashed}>Bad</button>
      <hr />

      <Statistics goodCount={totalGood} neutralCount={totalNeutral} badCount={totalBad} totalCount={allClicks} average={average} percentage={percentage} />
      
    </div>
  )
}

export default App