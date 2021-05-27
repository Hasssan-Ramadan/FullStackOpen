import { useState } from 'react'
const Result = ({ searchValue, countries }) => {
  const matchedCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(`${searchValue}`.toLowerCase())
  )
  const [showCountry, setShowCountry] = useState()
  const handleClick = (event) => {
    console.log(event.target.value)
    const matchedCountry = countries.filter((country) =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    console.log(event.target.value)
    setShowCountry(...matchedCountry)
  }
  if (matchedCountries.length > 10) return <p>too many countries</p>
  else if (matchedCountries.length <= 10 && matchedCountries.length !== 1)
    return (
      <>
        <ul>
          {matchedCountries.map((country) => (
            <li key={country.name}>
              {country.name}
              <button onClick={handleClick} value={country.name}>
                show
              </button>
              {showCountry && country.name === showCountry.name ? (
                <div>
                  <h3>Name: {country.name}</h3>
                  <h4>Capital: {country.capital}</h4>
                  <p>Population: {country.population}</p>
                  <p>
                    Flag:{' '}
                    <img
                      style={{
                        width: '200px',
                        height: 'auto',
                        display: 'block',
                      }}
                      src={country.flag}
                      alt={country.name}
                    />
                  </p>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      </>
    )
  else if (matchedCountries.length === 1)
    return (
      <>
        <h1>{matchedCountries[0].name}</h1>
        <p>capital {matchedCountries[0].capital}</p>
        <p>population {matchedCountries[0].population}</p>
        <h2>languages</h2>
        <ul>
          {matchedCountries[0].languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img
          src={matchedCountries[0].flag}
          alt={matchedCountries[0].name}
          style={{
            width: '200px',
            height: 'auto',
            display: 'block',
          }}
        />
      </>
    )
}
export default Result
