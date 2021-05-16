import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './index'
import userEvent from '@testing-library/user-event'

describe('<Togglable />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    )
  })

  test('renders its children', () => {
    expect(
      component.container.querySelector('.testDiv')
    ).toBeDefined()
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    //CLICK USING FIREEVENT
		// const button = component.getByText('show...')
    // fireEvent.click(button)
		
		//CLICK USING USEREVENT
		userEvent.click(component.getByText(/show.../i))	
    
		const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

	test('toggled content can be closed', () => {

		// const button =  component.getByText('show...')
		// fireEvent.click(button)

		userEvent.click( component.getByText('show...'))

		// const closeButton = component.getByText('cancel')
		// fireEvent.click(closeButton)


		userEvent.click(component.getByText('cancel'))

		const div = component.container.querySelector('.togglableContent')
		expect(div).toHaveStyle('display: none')
	})

})