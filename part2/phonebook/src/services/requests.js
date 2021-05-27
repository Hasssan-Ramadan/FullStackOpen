import axios from 'axios'
const resourceUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
  const request = axios.get(resourceUrl)
  return request.then((response) => response.data)
}

const createNewPerson = (newPerson) => {
  const request = axios.post(resourceUrl, newPerson)
  return request.then((response) => response.data)
}

export default { getAllPersons, createNewPerson }
