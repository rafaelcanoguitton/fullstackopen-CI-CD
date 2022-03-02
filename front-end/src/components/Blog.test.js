import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> component tests', () => {
  let component
  let upLikes
  beforeEach(() => {
    upLikes=jest.fn()
    const testBlog = {
      title: 'Generic title',
      author: 'Some author',
      likes: 0,
      url: 'https soemthing',
    }
    //Since these are prop.types required
    const User = {
      id: '123',
      username: 'rafael',
    }
    const deleteBlog = () => 1
    const showButton = true
    component = render(
      <Blog
        blog={testBlog}
        showButton={showButton}
        deleteBlog={deleteBlog}
        user={User}
        updateBlog={upLikes}
      />
    )
  })
  test('render only title and author by default', () => {
    const button = component.container.querySelector('button')
    expect(button).toHaveTextContent('view') //Button that only renders
    //when only author and title get rendered
  })
  test('render likes and url when button gets pressed',() => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const newButton=component.container.querySelector('button')
    expect(newButton).toHaveTextContent('hide')
  })
  test('if like button is clicked twite, the event handler gets called twice',() => {
    const button=component.container.querySelector('button')
    fireEvent.click(button)
    const likeButton=component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(upLikes.mock.calls).toHaveLength(2)
  })
})
