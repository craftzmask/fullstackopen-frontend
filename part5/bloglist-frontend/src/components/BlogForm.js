import { useState } from 'react'
import Input from './Input'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="title"
          type="text"
          name="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <Input
          label="author"
          type="text"
          name="author"
          value={author}
          onChange={event => setAuthor(event.target.value)}
        />
        <Input
          label="url"
          type="text"
          name="url"
          value={url}
          onChange={event => setUrl(event.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm