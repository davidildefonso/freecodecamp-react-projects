import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import Login from './index'


//OVER  NESTED TESTS EXAMPLE

// describe('Login', () => {
//   let utils,
//     handleSubmit,
//     user,
//     changeUsernameInput,
//     changePasswordInput,
//     clickSubmit

//   beforeEach(() => {
//     handleSubmit = jest.fn()
//     user = {username: 'michelle', password: 'smith'}
//     utils = render(<Login onSubmit={handleSubmit} />)
//     changeUsernameInput = value =>
//       userEvent.type(utils.getByLabelText(/username/i), value)
//     changePasswordInput = value =>
//       userEvent.type(utils.getByLabelText(/password/i), value)
//     clickSubmit = () => userEvent.click(utils.getByText(/submit/i))
//   })
//   describe('when username and password is provided', () => {
//    beforeEach(() => {
//       changeUsernameInput(user.username)
//       changePasswordInput(user.password)
//     })
//     describe('when the submit button is clicked', () => {
//       beforeEach(() => {
//         clickSubmit()
//       })
//       it('should call onSubmit with the username and password', () => {
//         expect(handleSubmit).toHaveBeenCalledTimes(1)
//         expect(handleSubmit).toHaveBeenCalledWith(user)
//       })
//     })
//   })
//   describe('when the password is not provided', () => {
//     beforeEach(() => {
//       changeUsernameInput(user.username)
//     })
//     describe('when the submit button is clicked', () => {
//       let errorMessage
//       beforeEach(() => {
//         clickSubmit()
//         errorMessage = utils.getByRole('alert')
//       })
//       it('should show an error message', () => {
//         expect(errorMessage).toHaveTextContent(/password is required/i)
//       })
//     })
//   })
//   describe('when the username is not provided', () => {
//     beforeEach(() => {
//       changePasswordInput(user.password)
//     })
//     describe('when the submit button is clicked', () => {
//       let errorMessage
//       beforeEach(() => {
//         clickSubmit()
//         errorMessage = utils.getByRole('alert')
//       })
//       it('should show an error message', () => {
//         expect(errorMessage).toHaveTextContent(/username is required/i)
//       })
//     })
//   })
// })


// NO NESTED TEST EXAMPLE WITH CODE REPETITION

// test('calls onSubmit with the username and password when submit is clicked', () => {
//   const handleSubmit = jest.fn()
//   const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)
//   const user = {username: 'michelle', password: 'smith'}
//   userEvent.type(getByLabelText(/username/i), user.username)
//   userEvent.type(getByLabelText(/password/i), user.password)
//   userEvent.click(getByText(/submit/i))
//   expect(handleSubmit).toHaveBeenCalledTimes(1)
//   expect(handleSubmit).toHaveBeenCalledWith(user)
// })

// test('shows an error message when submit is clicked and no username is provided', () => {
//   const handleSubmit = jest.fn()
//   const {getByLabelText, getByText, getByRole} = render(
//     <Login onSubmit={handleSubmit} />,
//   )
//   userEvent.type(getByLabelText(/password/i), 'anything')
//   userEvent.click(getByText(/submit/i))
//   const errorMessage = getByRole('alert')
//   expect(errorMessage).toHaveTextContent(/username is required/i)
//   expect(handleSubmit).not.toHaveBeenCalled()
// })

// test('shows an error message when submit is clicked and no password is provided', () => {
//   const handleSubmit = jest.fn()
//   const {getByLabelText, getByText, getByRole} = render(
//     <Login onSubmit={handleSubmit} />,
//   )
//   userEvent.type(getByLabelText(/username/i), 'anything')
//   userEvent.click(getByText(/submit/i))
//   const errorMessage = getByRole('alert')
//   expect(errorMessage).toHaveTextContent(/password is required/i)
//   expect(handleSubmit).not.toHaveBeenCalled()
// })


//USING THE AHA PRINCIPLE WITH A SETUP FUNCTION

function setup() {
  const handleSubmit = jest.fn()
  const utils = render(<Login onSubmit={handleSubmit} />)
  const user = {username: 'michelle', password: 'smith'}
  const changeUsernameInput = value =>
    userEvent.type(utils.getByLabelText(/username/i), value)
  const changePasswordInput = value =>
    userEvent.type(utils.getByLabelText(/password/i), value)
  const clickSubmit = () => userEvent.click(utils.getByText(/submit/i))
  return {
    ...utils,
    handleSubmit,
    user,
    changeUsernameInput,
    changePasswordInput,
    clickSubmit,
  }
}

function setupSuccessCase() {
  const utils = setup()
  utils.changeUsernameInput(utils.user.username)
  utils.changePasswordInput(utils.user.password)
  utils.clickSubmit()
  return utils
}

function setupWithNoPassword() {
  const utils = setup()
  utils.changeUsernameInput(utils.user.username)
  utils.clickSubmit()
  const errorMessage = utils.getByRole('alert')
  return {...utils, errorMessage}
}

function setupWithNoUsername() {
  const utils = setup()
  utils.changePasswordInput(utils.user.password)
  utils.clickSubmit()
  const errorMessage = utils.getByRole('alert')
  return {...utils, errorMessage}
}

test('calls onSubmit with the username and password', () => {
  const {handleSubmit, user} = setupSuccessCase()
  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(user)
})

test('shows an error message when submit is clicked and no username is provided', () => {
  const {handleSubmit, errorMessage} = setupWithNoUsername()
  expect(errorMessage).toHaveTextContent(/username is required/i)
  expect(handleSubmit).not.toHaveBeenCalled()
})

test('shows an error message when password is not provided', () => {
  const {handleSubmit, errorMessage} = setupWithNoPassword()
  expect(errorMessage).toHaveTextContent(/password is required/i)
  expect(handleSubmit).not.toHaveBeenCalled()
})