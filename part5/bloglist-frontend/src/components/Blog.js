import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeClick = () => {
    const blogObject = {
      ...blog,
      likes: blog.likes + 1
    }
    likeBlog(blog.id, blogObject)
  }

  const handleRemoveClick = () => {
    removeBlog(blog.id, blog)
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
          <button onClick={handleLikeClick}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={handleRemoveClick}>remove</button>
      </div>

    </div>  
  )
}
export default Blog