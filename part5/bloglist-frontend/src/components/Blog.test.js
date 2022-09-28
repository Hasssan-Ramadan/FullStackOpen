import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import Blog from './Blog'

/*
 * checks that the component displaying a blog:
 * 1. renders the blog's title and author by default.
 * 2. does not render its url or number of likes by default.
 * 3. shows the blog's url and number of likes when the button controlling the shown details has been clicked.
 * 4. calls the remove button's event handler twice, if the remove button is clicked twice.
 */
describe('<Blog/>', () => {
  const userObj = {
    name: 'Hassan Ramadan',
    username: 'RmdanJr',
    id: '200',
  }
  const blogObj = {
    id: '200',
    title: 'How to be a self-taught software developer?',
    author: 'Ahmed Ali',
    url: 'https://google.com',
    likes: 23,
    user: userObj,
  }

  test('renders title and author by default', () => {
    render(<Blog blog={blogObj} user={userObj} />)
    const titleEl = screen.getByText(
      'How to be a self-taught software developer?',
      { exact: false }
    )
    const authorEl = screen.getByText('Ahmed Ali', { exact: false })
    expect(titleEl.parentElement).toHaveStyle('display: block')
    expect(authorEl.parentElement).toHaveStyle('display: block')
  })

  test('does not render its url or number of likes by default', () => {
    render(<Blog blog={blogObj} user={userObj} />)
    const urlEl = screen.getByText('https://google.com')
    const likesEl = screen.getByText('23', { exact: false })
    expect(urlEl.parentElement).toHaveStyle('display: none')
    expect(likesEl.parentElement).toHaveStyle('display: none')
  })

  test("shows the blog's url and number of likes when the button controlling the shown details has been clicked.", async () => {
    const user = userEvent.setup()
    render(<Blog blog={blogObj} user={userObj} />)
    const btnEl = screen.getByText('view')
    await user.click(btnEl)
    const urlEl = screen.getByText('https://google.com')
    const likesEl = screen.getByText('23', { exact: false })
    expect(btnEl.textContent).toBe('hide')
    expect(urlEl.parentElement).toHaveStyle('display: block')
    expect(likesEl.parentElement).toHaveStyle('display: block')
  })

  test("calls the remove button's event handler twice, if the remove button is clicked twice.", async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    render(<Blog blog={blogObj} user={userObj} removeBlog={mockHandler} />)
    const removeBtnEl = screen.getByText('remove')
    await user.click(removeBtnEl)
    await user.click(removeBtnEl)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
