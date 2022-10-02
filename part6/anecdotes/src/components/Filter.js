import { useDispatch } from 'react-redux'
import { update } from '../reducers/searchTermReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(update(event.target.value))
  }

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
