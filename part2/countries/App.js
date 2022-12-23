import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";


const ShowList = ({showCountries, setSearchWord, findByName}) => {
  const showDetail = (event) => {
    const name = event.target.name
    setSearchWord(name)
    findByName(name)
  }

  const num = showCountries.length
  if (num > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (num > 1) {
    return (
      <div>
        {showCountries.map((country) =>
          <div key={country.name.common}>
            {country.name.common}
            <button name={country.name.common} onClick={showDetail}>show</button>
          </div> 
        )}
      </div>
    )
  } else if (num === 1) {
    return (
      <Country 
        country={showCountries[0]}
      />
    )
  }
}

const App =  () => {
  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [showCountries, setShowCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data)
      });
  }, []);

  const findByName = (name) => {
    const len = name.length
    const showLists = []
    countries.forEach(element => {
      const countryName = element.name.common
      for (let i = 0; i < countryName.length - len + 1; i++) {
        const countryPart = countryName.toLowerCase().substring(i, i + len)
        if (name.toLowerCase() === countryPart) {
          showLists.push(element)
          break;
        } 
      }
    });

    setShowCountries(showLists)
  }

  const handleSearchChange = (event) => {
    const name = event.target.value
    setSearchWord(name)
    findByName(name)
  }

  return (
    <div>
      <div>find countries</div>
      <input 
        value={searchWord}
        onChange={handleSearchChange}
      />
      <ShowList 
        showCountries={showCountries}
        setSearchWord={setSearchWord}
        findByName={findByName}
      />
    </div>
  )
}

export default App