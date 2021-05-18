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

test('on initial render it shows the form with input and its placeholder as well as the submit and clear all button', () => {
  
  const component = render(
    <App />
  )

  const input = component.container.querySelector('input')
  const button = component.container.querySelector('button')

  expect(input.getAttribute("placeholder")).toBe("new item")
	expect(button).toHaveTextContent("Submit")
	expect(screen.getByText(/Clear All/)).toBeDefined()
 
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
  expect(buttonList).toHaveLength(2)
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



test("on a single item if edit button is clicked it shows an input and user can edit type inmediately and correctly", () => {
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

	const editButton = item.parentElement.querySelector("button")
	userEvent.click(editButton)

	const inputs = component.container.querySelectorAll('input')
	expect(inputs).toHaveLength(2)
	
 	userEvent.type(inputs[1], "a new lamborghini") 
	
	

	expect(inputs[1].value).toBe("a new lamborghini") 
	expect(inputs[0].value).not.toBe("a new lamborghini")   
	
	

})


test(`on edited item if user clicks edit button 
 the item new value is saved and shows a div not an input`, () => {
	const component = render(
			<App />
		)
	
	const input = component.container.querySelector("input")	
	userEvent.type(input, "1 package of toilet paper")
		
  const button = screen.getByText(/Submit/);
  userEvent.click(button)

	const item = screen.getByText("1 package of toilet paper") 

	const editButton = item.parentElement.querySelector("button")
	userEvent.click(editButton)

	const inputs = component.container.querySelectorAll('input')
	
 	userEvent.type(inputs[1], "a new lamborghini") 

	userEvent.click(editButton)

	expect(component.container.querySelectorAll("input")).toHaveLength(1)

	expect(screen.getByText(/a new lamborghini/)).toBeDefined()
 

})

test(`on edited item if user press enter button
 the item new value is saved and shows a div not an input`, () => {
	const component = render(
			<App />
		)
	
	const input = component.container.querySelector("input")	
	userEvent.type(input, "1 package of toilet paper")
		
  const button = screen.getByText(/Submit/);
  userEvent.click(button)

	const item = screen.getByText("1 package of toilet paper") 

	const editButton = item.parentElement.querySelector("button")
	userEvent.click(editButton)

	const inputs = component.container.querySelectorAll('input')
	
 	userEvent.type(inputs[1], "a new lamborghini") 

	fireEvent.keyDown(inputs[1], { keyCode: 13 })   

	expect(component.container.querySelectorAll("input")).toHaveLength(1)

	expect(screen.getByText(/a new lamborghini/)).toBeDefined()
 

})


test("on remove button pressed it deletes de item from the list",() =>{
	const component = render(<App></App>)
	userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
	userEvent.click(screen.getByText(/Submit/)) 
	userEvent.click(screen.getByText(/Remove/))
	expect(component.container).not.toHaveTextContent("1 kg of sugar") 

})




test("on clear all button click all items from the list are removed", () => {
	const component = render(<App></App>)
	userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
	userEvent.click(screen.getByText(/Submit/)) 
	userEvent.click(screen.getByText(/Clear All/))
	expect(component.container).not.toHaveTextContent("1 kg of sugar")  

})




describe("On multiple items on the list", () => {
	beforeEach(() => {
    

  })

	test(`if edit button associated to an item is clicked it shows
 		an input for the item only, and user can edit it inmediately and correctly`, () => {	
		const component = render(
			<App />
		)
		
		const input = component.container.querySelector("input")	
		userEvent.type(input, "1 package of toilet paper")
			
		const button = screen.getByText(/Submit/);
		userEvent.click(button)

		userEvent.type(input, "10 bananas")
		userEvent.click(button)

		userEvent.type(input, "a package of face masks")
		userEvent.click(button)

		expect(screen.getByText("1 package of toilet paper")).toBeDefined()
		expect(screen.getByText("10 bananas")).toBeDefined()
		expect(screen.getByText("a package of face masks")).toBeDefined()

		const item = screen.getByText("1 package of toilet paper")		
		const editButton = item.parentElement.querySelector("button")
		userEvent.click(editButton)
 
		const inputs = component.container.querySelectorAll('input')
		expect(inputs).toHaveLength(2)
	
 		userEvent.type(inputs[1], "a new lamborghini") 
		
		expect(inputs[1].value).toBe("a new lamborghini") 
		expect(inputs[0].value).toBe("")    
	 

	})

	test(`on edited item if user clicks edit button 
	the item new value is saved and shows a div not an input`, () => {
		const component = render(
				<App />
			)
		
		const input = component.container.querySelector("input")	
		userEvent.type(input, "1 package of toilet paper")
			
		const button = screen.getByText(/Submit/);
		userEvent.click(button)

		userEvent.type(input, "10 bananas")
		userEvent.click(button)

		userEvent.type(input, "a package of face masks")
		userEvent.click(button)

		const item = screen.getByText("1 package of toilet paper")		
		const editButton = item.parentElement.querySelector("button")
		userEvent.click(editButton)

		const inputs = component.container.querySelectorAll('input')
		expect(inputs).toHaveLength(2)
	
 		userEvent.type(inputs[1], "a new lamborghini") 

		userEvent.click(editButton)

		expect(component.container.querySelectorAll("input")).toHaveLength(1)

		expect(screen.getByText(/a new lamborghini/)).toBeDefined()
	

	})

	test(`on edited item if user press enter button
	the item new value is saved and shows a div not an input`, () => {
		const component = render(
				<App />
			)
		
		const input = component.container.querySelector("input")	
		userEvent.type(input, "1 package of toilet paper")
			
		const button = screen.getByText(/Submit/);
		userEvent.click(button)

		userEvent.type(input, "10 bananas")
		userEvent.click(button)

		userEvent.type(input, "a package of face masks")
		userEvent.click(button)


		const item = screen.getByText("1 package of toilet paper") 

		const editButton = item.parentElement.querySelector("button")
		userEvent.click(editButton)

		const inputs = component.container.querySelectorAll('input')
		
		userEvent.type(inputs[1], "a new lamborghini") 

		fireEvent.keyDown(inputs[1], { keyCode: 13 })   

		expect(component.container.querySelectorAll("input")).toHaveLength(1)

		expect(screen.getByText(/a new lamborghini/)).toBeDefined()
	

	})

	test(`on  a single item button remove click y removes the associated item from the list`, () => {
		const component = render(<App></App>)
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/)) 
	
		userEvent.type(component.container.querySelector("input"), "1 kg of bananas")
		userEvent.click(screen.getByText(/Submit/)) 

		userEvent.type(component.container.querySelector("input"), "1 kg of strawberries")
		userEvent.click(screen.getByText(/Submit/)) 

		userEvent.click(screen.getAllByText(/Remove/)[0])

		expect(component.container).not.toHaveTextContent("1 kg of sugar") 
	
 
	})

	test("on clear all button click all items from the list are removed", () => {
		const component = render(<App></App>)
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/)) 
	
		userEvent.type(component.container.querySelector("input"), "1 kg of bananas")
		userEvent.click(screen.getByText(/Submit/)) 

		userEvent.type(component.container.querySelector("input"), "1 kg of strawberries")
		userEvent.click(screen.getByText(/Submit/)) 

		userEvent.click(screen.getByText(/Clear All/)) 
		expect(component.container).not.toHaveTextContent("1 kg of sugar")  

	})

})

describe("for both single item or multiple items on the list", () => {
	test("on page refresh the list items persist", () => {
	   
	
		const component = render(<App></App>)
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/)) 
	
		userEvent.type(component.container.querySelector("input"), "1 kg of bananas")
		userEvent.click(screen.getByText(/Submit/)) 

		userEvent.type(component.container.querySelector("input"), "1 kg of strawberries")
		userEvent.click(screen.getByText(/Submit/))

	
		require('./reloadEventListener') 

		delete window.location

		window.location = {
			reload: jest.fn(),
		}

		fireEvent.keyDown(window, { key: "F5" })     

		expect(component.container).toHaveTextContent("1 kg of sugar")  
		expect(component.container).toHaveTextContent("1 kg of bananas")  
		expect(component.container).toHaveTextContent("1 kg of strawberries")  
		
	
	
	})




})

