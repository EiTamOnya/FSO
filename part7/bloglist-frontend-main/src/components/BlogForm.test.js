import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> check input elements', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlog} />
  )

  const input = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'Test author' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toMatchObject({ title: 'Test author' })
})
