import React from 'react'

const error = {
  color: 'red',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
}

const success = {
  color: 'green',
  background: 'lightgrey',
  font_size: 20,
  border_style: 'solid',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
}

const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  } else {
    return (
      <div id='notification' style={successMessage ? success : error}>
        {successMessage || errorMessage}
      </div>
    )
  }
}

export default Notification
