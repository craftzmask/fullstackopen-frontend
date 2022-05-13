import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      setUser(JSON.parse(loggedUser))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async userObject => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      console.error(error.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken('')
  }

  const createBlog = async blogObject => {
    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
    } catch (error) {
      console.error(error.response.data.error)
    }
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <BlogForm createBlog={createBlog} />
        <BlogList blogs={blogs} />
      </div>
    )
  }

  return (
    <div>
      <h2>log in to application</h2>
      <LoginForm handleLogin={handleLogin} />
    </div>
  )
}

export default App
