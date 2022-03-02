import React, { useState } from 'react'
const BlogForm=({ handleCreate }) => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const callTheFunction=(event) => {
    event.preventDefault()
    handleCreate({
      title:title,
      author:author,
      url:url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return <div>
    <form onSubmit={callTheFunction}>
      <div>
        title:{' '}
        <input
          type="text"
          value={title}
          id="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author{' '}
        <input
          type="text"
          value={author}
          id="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url{' '}
        <input
          type="text"
          value={url}
          id="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
}
export default BlogForm