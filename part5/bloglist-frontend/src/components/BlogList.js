import Blog from "./Blog"

const BlogList = props => {
  return (
    <div>
      {props.blogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog} 
          likeBlog={props.likeBlog} 
          removeBlog={props.removeBlog} />
      )}
    </div>
  )
}

export default BlogList