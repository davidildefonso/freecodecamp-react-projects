import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'


test('renders title "GROCERY BUD"', () => {
  render(<App />);
  const linkElement = screen.getByText(/GROCERY BUD/);
  expect(linkElement).toBeInTheDocument();
});

test('on initial render it shows the form with input and its placeholder as well as the button', () => {
  
  const component = render(
    <App />
  )

  const input = component.container.querySelector('input')
  const button = component.container.querySelector('button')

  expect(input.getAttribute("placeholder")).toBe("new item")
	expect(button).toHaveTextContent("Submit")
 
})



test('if input is empty click on submit does nothing', () => {
	const handleSubmit = jest.fn()
	const component = render(
		<App />
	)

  const button = screen.getByText(/Submit/);
  userEvent.click(button)

	const buttonList = component.container.querySelectorAll("button")

	expect(handleSubmit).not.toHaveBeenCalledTimes(1)
  
})


test('if input is not empty click on submit shows the list ', () => {
	const component = render(
		<App />
	)
		
	const input = component.container.querySelector("input")	
	userEvent.type(input, "1 package of toilet paper")
		
  const button = screen.getByText(/Submit/);
  userEvent.click(button)

	const buttonList = component.container.querySelectorAll("button")

  expect(buttonList).not.toHaveLength(1)

})

test('if input is not empty click on submit adds the input value to the list ', () => {
	const component = render(
		<App />
	)
	
	const input = component.container.querySelector("input")	
	userEvent.type(input, "1 package of toilet paper")
		
  const button = screen.getByText(/Submit/);
  userEvent.click(button)

	const div = screen.getByText("1 package of toilet paper")

  expect(div).toBeDefined()
})

test('after new item is added the input field is emptied ', () => {
	const component = render(
		<App />
	)
	
	const input = component.container.querySelector("input")	
	userEvent.type(input, "1 package of toilet paper")
		
  const button = screen.getByText(/Submit/);
  userEvent.click(button)

	const div = screen.getByText("1 package of toilet paper")

  expect(div).toBeDefined()

  expect(input.value).toBe("")  
})