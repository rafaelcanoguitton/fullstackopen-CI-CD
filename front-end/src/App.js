import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/blogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [style, setStyle] = useState('')
  const handleLogout = async () => {
    setUsername('')
    setPassword('')
    setUser(null)
    window.localStorage.removeItem('blogToken')
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      setUser(user)
      setUsername(user.username)
      setPassword('')
      window.localStorage.setItem('blogToken', JSON.stringify(user))
      setStyle('success')
      setMessage('Logged in successfully')
      setTimeout(() => {
        setMessage('')
      }, 4000)
    } catch (exepction) {
      setStyle('error')
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }
  }
  const deleteBlog = (delBlog) => {
    try {
      const updatedBlogs = blogs.filter((blog) => blog.id !== delBlog.id)
      updatedBlogs.sort((a, b) => {
        if (a.likes < b.likes) {
          return 1
        } else if (a.likes > b.likes) {
          return -1
        }
        return 0
      })
      setBlogs(updatedBlogs)
      setStyle('success')
      setMessage(`Blog ${delBlog.title} has been deleted`)
      setTimeout(() => {
        setMessage('')
      }, 4000)
    } catch (e) {
      setStyle('error')
      setMessage('There was an error deleting the blog')
      setTimeout(() => {
        setMessage('')
      }, 4000)
    }
  }
  const updateBlog=async (blog) => {
    const newBlog=await blogService.updateBlog(blog,user.token)
    const updatedBlogs=blogs.map((b) => {
      if(b.id===newBlog.id){
        return newBlog
      }
      return b
    })
    updatedBlogs.sort((a, b) => {
      if (a.likes < b.likes) {
        return 1
      } else if (a.likes > b.likes) {
        return -1
      }
      return 0
    })
    setBlogs(updatedBlogs)
  }
  useEffect(async () => {
    const blogsFromsv = await blogService.getAll()
    blogsFromsv.sort((a, b) => {
      if (a.likes < b.likes) {
        return 1
      } else if (a.likes > b.likes) {
        return -1
      }
      return 0
    })
    setBlogs(blogsFromsv)
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogToken')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  const handleCreate=async(blog) => {
    try{
      const blogToPost={
        title:blog.title,
        author:blog.author,
        url:blog.url
      }
      console.log(user.token)
      const newBlog= await blogService.postBlog(blogToPost,user.token)
      newBlog.user=user
      setBlogs(blogs.concat(newBlog))
      setStyle('success')
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {  setMessage('') }, 4000)
    } catch (exception){
      setStyle('error')
      setMessage('The blog couldn\'t be added')
      setTimeout(() => {  setMessage('') }, 4000)
    }
  }
  if (user === null) {
    return (
      <>
        <Notification message={message} style={style} />
        <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      </>
    )
  }

  return (
    <div>
      <Notification message={message} style={style} />
      <h2>blogs</h2>
      <div>
        {username} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <br />
      <Togglable buttonLabel={'New blog'}>
        <BlogForm
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
          setStyle={setStyle}
          setMessage={setMessage}
          handleCreate={handleCreate}
        />
      </Togglable>
      {blogs.map((blog) => {
        let showButton = false
        if (blog.user) {
          console.log(blog.user,user.username)
          if (blog.user.username === user.username) {
            showButton = true
          }
        }
        return (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            deleteBlog={deleteBlog}
            showButton={showButton}
            updateBlog={updateBlog}
          />
        )
      })}
    </div>
  )
}

export default App
