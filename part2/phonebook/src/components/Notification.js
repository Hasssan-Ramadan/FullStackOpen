import React from 'react'

const Notification = ({ CssClass, message }) => {
  if (message === null) {
    return null
  }

  return <div className={CssClass}>{message}</div>
}

export default Notification
