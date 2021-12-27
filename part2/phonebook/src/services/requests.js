import axios from 'axios'
const resourceUrl = '/api/persons'

const getAllPersons = () => {
  const request = axios.get(resourceUrl)
  return request
}

const createNewPerson = (newPerson) => {
  const request = axios.post(resourceUrl, newPerson)
  return request
}

const deletePerson = (id) => {
  const request = axios.delete(`${resourceUrl}/${id}`)
  return request
}

const updatePerson = (id, person) => {
  const request = axios.put(`${resourceUrl}/${id}`, person)
  return request
}

export default { getAllPersons, createNewPerson, deletePerson, updatePerson }
