import { useEffect, useState } from 'react'
import axios from 'axios'

import SearchInput from './components/SearchInput'
import Result from './components/Result'

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const handelChange = (event) => {
    return setSearchValue(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((Response) => {
      setCountries(Response.data)
    })
  }, [])

  return (
    <>
      <SearchInput searchValue={searchValue} handelChange={handelChange} />
      <Result searchValue={searchValue} countries={countries} />
    </>
  )
}

export default App
