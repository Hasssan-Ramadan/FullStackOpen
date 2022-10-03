import { connect } from 'react-redux'

const Notification = ({ notification}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  if (notification) return <div style={style}> {notification} </div>
}

export default connect(
  (state) => {
    return { notification: state.notification }
  }
)(Notification)
