import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const title = component.container.querySelector('.title')
  const author = component.container.querySelector('.author')
  const likes = component.container.querySelector('.likes')
  const url = component.container.querySelector('.url')

  component.debug()
  expect(title).toHaveTextContent(blog.title)
  expect(author).toHaveTextContent(blog.author)
  expect(likes).toHaveTextContent('likes:')
  expect(url).not.toHaveTextContent()
})
