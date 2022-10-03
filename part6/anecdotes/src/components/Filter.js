import { connect } from 'react-redux'
import { update } from '../reducers/searchTermReducer'

const Filter = ({ update }) => {
  const handleChange = (event) => update(event.target.value)

  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { update })(Filter)
