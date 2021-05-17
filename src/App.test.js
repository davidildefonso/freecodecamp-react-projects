import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { prettyDOM } from '@testing-library/dom'


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
  expect(buttonList).toHaveLength(1)
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


test("if item list has at least an item, another item can be added to the list", () => {
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

	userEvent.type(input, "3 kg of apples")
		
  userEvent.click(button)

	const item1 = screen.getByText("1 package of toilet paper")
	const item2 = screen.getByText("3 kg of apples")
	expect(item1).toBeDefined()
  expect(item2).toBeDefined()
  expect(input.value).toBe("") 


})


test("if an item is clicked it is removed from the list", () => {
	const component = render(
		<App />
	)
	
	const input = component.container.querySelector("input")	
	userEvent.type(input, "1 package of toilet paper")
		
  const button = screen.getByText(/Submit/);
  userEvent.click(button)

	const item = screen.getByText("1 package of toilet paper")
  expect(item).toBeDefined()
  expect(input.value).toBe("")

	userEvent.click(item)

	
	expect(component.container).not.toHaveTextContent("1 package of toilet paper")

})

test("if edit button is clicked it show an input with the associated item value", () => {
	const component = render(
		<App />
	)
	
	const input = component.container.querySelector("input")	
	userEvent.type(input, "1 package of toilet paper")
		
  const button = screen.getByText(/Submit/);
  userEvent.click(button)

	const item = screen.getByText("1 package of toilet paper")
  expect(item).toBeDefined()
  expect(input.value).toBe("")

	const editButton = screen.getByText(/Edit/)
	userEvent.click(editButton)

	const inputs = component.container.querySelectorAll('input')
  let inputItem 
	inputs.forEach(element => {
		if(element.value === "1 package of toilet paper"){
			inputItem = element
		}
	});
   
  expect(inputItem).toBeDefined()  
	expect(inputItem.value).toBe("1 package of toilet paper")
	

	 

})

test("if edit button is clicked it show an input and user can edit type inmediately and correctly", () => {
	const component = render(
		<App />
	)
	
	const input = component.container.querySelector("input")	
	userEvent.type(input, "1 package of toilet paper")
		
  const button = screen.getByText(/Submit/);
  userEvent.click(button)

	const item = screen.getByText("1 package of toilet paper")
  expect(item).toBeDefined()
  expect(input.value).toBe("")

	const editButton = screen.getByText(/Edit/)
	userEvent.click(editButton)

	const inputs = component.container.querySelectorAll('input')
  let inputItem 
	inputs.forEach(element => {
		if(element.value === "1 package of toilet paper"){
			inputItem = element
		}
	});
   
  expect(inputItem).toBeDefined()  
	expect(inputItem.value).toBe("1 package of toilet paper")
	
	userEvent.type(inputItem, "a new lamborghini")
	
	expect(inputItem.value).toBe("a new lamborghini")
	

})