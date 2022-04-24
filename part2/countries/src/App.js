import axios from 'axios'
import { useState, useEffect } from 'react'

const apiKey = process.env.REACT_APP_API_KEY

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
)

const SearchBar = ({ query, handleQueryChange }) => (
  <div>
    find countries
    <input 
      value={query}
      onChange={handleQueryChange}
    />
  </div>
)

const Country = ({ country }) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <p><strong>languages:</strong></p>
      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img 
        src={country.flags.svg}
        alt={`${country.name.common}'s flag`}
        width='150'
      />
    </div>
  )
}

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => setWeather(response.data))
  }, [city])

  if (!weather) return <></>
  
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const Countries = ({ countries }) => {
  const len = countries.length
  const [countriesShownIndex, setCountriesShownIndex] = useState(
    Array(len).fill(false)
  )

  if (len === 1) {
    return (
      <div>
        <Country country={countries[0]} />
        <Weather city={countries[0].capital} />
      </div>
    )
  }

  if (len > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  const handleClick = i => {
    const copy = [...countriesShownIndex]
    copy[i] = !copy[i]
    setCountriesShownIndex(copy)
  }

  return (
    <div>
      {countries.map((country, i) => (
        <div key={country.name.official}>
          {country.name.common}
          <Button 
            label={countriesShownIndex[i] ? 'cancel' : 'show'} 
            onClick={() => handleClick(i)} 
          />
          {countriesShownIndex[i] 
            ? <Country country={country} /> 
            : null
          }
        </div>
      ))}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = !query.length 
    ? []
    : countries.filter(country => {
        const countryName = country.name.common.toLowerCase()
        const q = query.toLowerCase()
        return countryName.includes(q)
      })

  const handleQueryChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <SearchBar
        query={query}
        handleQueryChange={handleQueryChange} 
      />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App
