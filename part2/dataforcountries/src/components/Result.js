const Result = ({ searchValue, countries }) => {
  const MatchedCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(`${searchValue}`.toLowerCase())
  )
  if (MatchedCountries.length > 10) return <p>too many countries</p>
  else if (MatchedCountries.length <= 10 && MatchedCountries.length !== 1)
    return (
      <>
        <ul>
          {MatchedCountries.map((country) => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
      </>
    )
  else if (MatchedCountries.length === 1)
    return (
      <>
        <h1>{MatchedCountries[0].name}</h1>
        <p>capital {MatchedCountries[0].capital}</p>
        <p>population {MatchedCountries[0].population}</p>
        <h2>languages</h2>
        <ul>
          {MatchedCountries[0].languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img
          src={MatchedCountries[0].flag}
          alt={MatchedCountries[0].name}
          style={{ height: '200px', width: '200px' }}
        />
      </>
    )
}
export default Result
