import { useEffect, useState } from 'react';
import './App.css';
import { SearchBar, SearchResult, CountryInfo } from './Component';
import axios from 'axios';
const dataURL = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const App = () => {
  const [allData, setAllData] = useState([]);
  const [contriesNames, setContriesNames] = useState([]);
  const [search, setSearch] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredId, setFilteredId] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [infoId, setInfoId] = useState(null); // Initial state set to null

  useEffect(() => {
    axios.get(dataURL)
      .then((response) => {
        setAllData(response.data);
        setContriesNames(response.data.map(country => country.name));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Filter country data based on the searchName
  useEffect(() => {
    if (searchName && allData.length > 0) {
      const filtered = allData.filter(country => 
        country.name.common.toLowerCase().includes(searchName.toLowerCase()))
        .map(country => country.ccn3);

      setFilteredId(filtered);
    } else {
      setFilteredId([]);
    }
  }, [searchName, allData]);

  // Search input handler
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  // Search submit handler
  const onSearch = (event) => {
    event.preventDefault();
    setSearchName(search);
    setShowResult(true);
    setShowInfo(false);
  };

  // Click handler for showing country info
  const onClickInfoBtn = (id) => {
    setInfoId(id);
    setShowResult(false);
    setShowInfo(true);
  };

  // Get the selected country based on infoId
  const selectedCountry = allData.find(country => country.ccn3 === infoId);

  return (
    <div>
      <h1>CountryWiki</h1>
      <div>
        <SearchBar action={onSearch} handler={searchHandler} />

        {/* Render the filtered country IDs or a message if none */}
        {showResult && (
          <SearchResult result={filteredId.length > 0 ? (
            <ul><p>Search Result:</p>
              {filteredId.slice(0,10).map(id => (
                <li key={id}>
                  {allData.find(country => country.ccn3 === id)?.name.common}
                  <button 
                    onClick={() => onClickInfoBtn(id)}
                    id='infoBtn'>
                    {allData.find(country => country.ccn3 === id)?.cca3}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No countries found for the search.</p>
          )} />
        )}

        {/* Conditionally render CountryInfo only if showInfo is true and selectedCountry exists */}
        {showInfo && selectedCountry ? (
          <CountryInfo 
            name={selectedCountry.name.common} 
            capital={selectedCountry.capital} 
            region={selectedCountry.region}
            subRegion={selectedCountry.subregion}
            area={selectedCountry.area} 
            languageList={Object.values(selectedCountry.languages).map(a=> <li> {a}</li> ) || {}} 
            flag={selectedCountry.flags?.png} 
            alt={selectedCountry.flags?.alt || 'Country flag'}
          />
        ) : (
          showInfo && <p>Country information not available.</p>
        )}
      </div>
    </div>
  );
};

export default App;
