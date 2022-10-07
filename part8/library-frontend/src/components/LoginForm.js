import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken, setPage }) => {
  const [login] = useMutation(LOGIN)

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await login({
      variables: {
        username: event.target.username.value,
        password: event.target.password.value,
      },
    })
    setToken(response.data.login.value)
    localStorage.setItem('user-token', response.data.login.value)
    event.target.username.value = ''
    event.target.password.value = ''
    setPage('authors')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input name='username' />
        </div>
        <div>
          password
          <input name='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
