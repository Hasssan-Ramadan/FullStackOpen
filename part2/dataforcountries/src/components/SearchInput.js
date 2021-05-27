const SearchInput = ({ searchValue, handelChange }) => {
  return (
    <>
      <label htmlFor='search-country'>find countries </label>
      <input
        type='text'
        name='search-country'
        id='search-country'
        value={searchValue}
        onChange={handelChange}
      />
    </>
  )
}

export default SearchInput
