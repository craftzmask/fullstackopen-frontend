import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const setupMessage = (message, type='success') => {
    setMessage(message)
    setType(type)
    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 5000)
  }

  const handleLogin = async userObject => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setupMessage('Logged successful')
    } catch (error) {
      setupMessage(error.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken('')
  }

  const createBlog = async blogObject => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      setupMessage(`a new blog ${savedBlog.title} by ${user.name} added`)
    } catch (error) {
      setupMessage(error.response.data.error, 'error')
    }
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} type={type} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <BlogList blogs={blogs} />
      </div>
    )
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={message} type={type} />
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default App
