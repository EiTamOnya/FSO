import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

  expect(title).toHaveTextContent(blog.title)
  expect(author).toHaveTextContent(blog.author)
  expect(likes).toHaveTextContent('likes:')
  expect(url).not.toHaveTextContent()
})

test('click button to see likes and url', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    likes: 13,
    url: 'test.com'
  }

  const component = render(
    <Blog blog={blog} />
  )


  const secondDiv = component.container.querySelector('.title ~ div')
  const button = component.container.querySelector('.title button')

  expect(secondDiv).toHaveStyle('display: none')
  fireEvent.click(button)
  expect(secondDiv).toHaveStyle('display: block')
})
