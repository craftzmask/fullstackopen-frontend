import { useState } from 'react'
import Input from './Input'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input 
        label="username"
        type="text"
        name="username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />
      <Input 
        label="password"
        type="password"
        name="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm