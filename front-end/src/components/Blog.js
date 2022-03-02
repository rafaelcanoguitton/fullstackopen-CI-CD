import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
const Blog = ({ blog, user, deleteBlog,showButton,updateBlog }) => {
  const [showInfo, setShow] = useState(false)
  const deleteHandler = async () => {
    console.log(blog)
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        await blogService.deleteBlog(blog.id, user.token)
        deleteBlog(blog)
      } catch (e) {
        console.log(e)
      }
    }
  }
  if (showInfo) {
    return (
      <div className='blog'>
        {blog.title}
        <button
          onClick={() => {
            setShow(!showInfo)
          }}
        >
          hide
        </button>
        <br />
        {blog.url}
        <br />
        {blog.likes}{' '}
        <button
          onClick={() => {
            const upLikes=blog
            upLikes.likes=blog.likes+1
            updateBlog(upLikes)
          }}
        >
          like
        </button>
        <br />
        {blog.author}
        <br />
        {showButton ? (
          <button onClick={deleteHandler}>remove</button>
        ) : (
          <></>
        )}
      </div>
    )
  } else {
    return (
      <div className='blog'>
        {blog.title} {blog.author}{' '}
        <button
          onClick={() => {
            setShow(!showInfo)
          }}
        >
          view
        </button>
      </div>
    )
  }
}
Blog.propTypes={
  blog:PropTypes.object.isRequired,
  user:PropTypes.object.isRequired,
  deleteBlog:PropTypes.func.isRequired,
  showButton:PropTypes.bool.isRequired
}
export default Blog
