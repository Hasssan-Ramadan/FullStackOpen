import { useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { remove } from '../reducers/notificationReducer'
import { update } from '../reducers/timerIdReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const timerId = useStore().getState().timerId
  useEffect(() => {
    const notifyTimerId = setTimeout(() => {
      dispatch(remove())
    }, 5000)
    clearTimeout(timerId)
    dispatch(update(notifyTimerId))
  })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  const notification = useSelector((state) => state.notification)

  if (notification) return <div style={style}> {notification} </div>
}

export default Notification
