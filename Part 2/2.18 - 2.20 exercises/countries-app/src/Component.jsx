import './App.css';

const SearchBar=(prop)=>{
    return(
        <>
        <form action="submit">
            <input onChange={prop.handler} type="text" />
            <button id='searchBtn' type="submit" onClick={prop.action}>Search</button>
        </form>
        </>
    )
}

const SearchResult = (props) =>{
    
        return <div>{props.result}</div>
   
}

const CountryInfo = (props) =>{
    
        return (<div>
            <h2>{props.name}</h2>
            <br />
            <p>Capital: {props.capital}</p>
            <p>Region: {props.region}</p>
            <p>Sub Region: {props.subRegion}</p>
            <p>Total Area: {props.area} km2</p>
            
            <br />
            <ul><p><b>Languages:</b></p>
            {props.languageList}
            </ul>
            <br />
            <img src={props.flag} alt={props.alt} />
        </div>)
    
}

export{
    SearchBar,
    SearchResult,
    CountryInfo
}