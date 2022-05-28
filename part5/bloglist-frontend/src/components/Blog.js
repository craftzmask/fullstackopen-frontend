import { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleClick = () => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1
    }
    likeBlog(blog.id, blogObject)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>

      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleClick}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>

    </div>  
  )
}
export default Blog