import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import BlogForm from './blogForm'
describe('Testing the blogForm', () => {
  test('form calls the event handler with right details', () => {
    const createBlog = jest.fn()
    const component = render(<BlogForm handleCreate={createBlog} />)
    const title = component.container.querySelector('#Title')
    const author = component.container.querySelector('#Author')
    const url = component.container.querySelector('#Url')
    const form = component.container.querySelector('form')
    fireEvent.change(title, {
      target: { value: 'test title' },
    })
    fireEvent.change(author, {
      target: { value: 'test author' },
    })
    fireEvent.change(url, {
      target: { value: 'test url' },
    })
    fireEvent.submit(form)
    expect(createBlog.mock.calls[0][0].toString()).toBe({
      title: 'test title',
      author: 'test author',
      url: 'test url',
    }.toString())
    expect(createBlog.mock.calls).toHaveLength(1)
  })
})
