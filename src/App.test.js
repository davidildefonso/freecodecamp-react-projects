import { render, screen, fireEvent, cleanup, act  } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { prettyDOM } from '@testing-library/dom'
import GroceryBudApp from './Components/Projects/GroceryBud'



describe("setup initial", () => {

	beforeEach(() => {
		localStorage.clear()
	})

	afterEach(() => cleanup()) 

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

})

describe("If no items added yet: ", () =>  {

	beforeEach(() => { 
		localStorage.clear()
	})

	afterEach(() => cleanup()) 

	test('if input is empty click on submit does nothing', () => {
		const handleSubmit = jest.fn()
		handleSubmit.mockReturnValueOnce()
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

})


describe("when list has only one item: ", () => {

	beforeEach(() => { 
		localStorage.clear() 
	})

	afterEach(() => cleanup()) 

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
		
		expect(inputs).toHaveLength(2)
		expect(inputs[1].value).toBe("1 package of toilet paper")
		

		

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

	test("on a single item if edit button is clicked it shows buttons 'OK' and 'Cancel' and does not show 'Edit' and 'Remove' buttons ", () => {
		const component = render(<App />)
		
		const input = component.container.querySelector("input")	
		userEvent.type(input, "1 package of toilet paper")
			
		const button = screen.getByText(/Submit/);
		userEvent.click(button)

		const item = screen.getByText("1 package of toilet paper") 

		const editButton = item.parentElement.querySelector("button")
		userEvent.click(screen.getByText(/Edit/))

		expect(component.container).toHaveTextContent("OK")
		expect(component.container).toHaveTextContent("Cancel")
		expect(component.container).not.toHaveTextContent("Edit")
		expect(component.container).not.toHaveTextContent("Remove")

	})


	test("on editing mode of a single item if either button  'OK' or 'Cancel' is clicked item returnes to normal mode, and OK Cancel button are replace for Edit Remove buttons ", () => {
		const component = render(<App />)
		
		const input = component.container.querySelector("input")	
		userEvent.type(input, "1 package of toilet paper")
			
		const button = screen.getByText(/Submit/);
		userEvent.click(button)

		const item = screen.getByText("1 package of toilet paper") 

		userEvent.click(screen.getByText(/Edit\b/ , { exact: true }))

		expect(component.container).toHaveTextContent("OK")
		expect(component.container).toHaveTextContent("Cancel")
		expect(component.container).not.toHaveTextContent("Edit")
		expect(component.container).not.toHaveTextContent("Remove")

		let inputs = component.container.querySelectorAll('input')
		expect(inputs).toHaveLength(2)
	//	component.debug()

		userEvent.click(screen.getByText(/OK/))



		expect(component.container).not.toHaveTextContent("OK")
		expect(component.container).not.toHaveTextContent("Cancel")
		expect(component.container).toHaveTextContent("Edit")
		expect(component.container).toHaveTextContent("Remove")


		inputs = component.container.querySelectorAll('input')
		expect(inputs).toHaveLength(1)
	
		userEvent.click(screen.getByText(/Edit\b/, { exact: true }))

		expect(component.container).toHaveTextContent("OK")
		expect(component.container).toHaveTextContent("Cancel")
		expect(component.container).not.toHaveTextContent(/Edit\b/) 
		expect(component.container).not.toHaveTextContent("Remove")

		inputs = component.container.querySelectorAll('input')
		expect(inputs).toHaveLength(2)

		userEvent.click(screen.getByText(/Cancel/))

		expect(component.container).not.toHaveTextContent("OK")
		expect(component.container).not.toHaveTextContent("Cancel")
		expect(component.container).toHaveTextContent("Edit")
		expect(component.container).toHaveTextContent("Remove")

		inputs = component.container.querySelectorAll('input')
		expect(inputs).toHaveLength(1)

	})


	test(`on edited item if no changes are made to the item and  user clicks OK button 
	the item  value doesnt change  and item returns to normal mode (not an input)`, () => {
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
		
		userEvent.click(screen.getByText(/OK/))

		expect(component.container.querySelectorAll("input")).toHaveLength(1)

		expect(screen.getByText(/1 package of toilet paper/)).toBeDefined()
	

	})


	test(`on edited mode if no changes are made to the item and  user clicks 'Cancel' button 
	the item  value doesnt change  and item returns to normal mode (not an input)`, () => {
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
		
		userEvent.click(screen.getByText(/Cancel/))

		expect(component.container.querySelectorAll("input")).toHaveLength(1)

		expect(screen.getByText(/1 package of toilet paper/)).toBeDefined()
	

	})


	test(`on edited item if user clicks OK button 
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

		
		userEvent.click(screen.getByText(/OK/))

		expect(component.container.querySelectorAll("input")).toHaveLength(1)

		expect(screen.getByText(/a new lamborghini/)).toBeDefined()
	

	})
		
	test(`on edited item if user presses enter key
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

	test(`on edited item if user edited the item value and clicks Cancel button 
	the item return to previous value and shows a div not an input`, () => {
		
		const component = render(<App />)
		
		userEvent.type(component.container.querySelector("input"), "1 package of toilet paper")
			
		userEvent.click(screen.getByText(/Submit/))

		userEvent.click(screen.getByText(/Edit/))

		let inputs = component.container.querySelectorAll('input')
		
		userEvent.type(inputs[1], "a new lamborghini") 
		//component.debug()
		inputs = component.container.querySelectorAll('input')
		expect(inputs[1].value).toBe("a new lamborghini")
		expect(component.container).not.toHaveTextContent("1 package of toilet paper")
	
		userEvent.click(screen.getByText(/Cancel/))

		expect(component.container.querySelectorAll("input")).toHaveLength(1)
		expect(component.container).toHaveTextContent("1 package of toilet paper")
	

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

})


 
 
   


describe("On multiple items on the list", () => {
	beforeEach(() => {
    	localStorage.clear()

  })

	afterEach(() => cleanup())

 
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
	component.debug()
 		userEvent.type(inputs[1], "a new lamborghini") 
		
		expect(inputs[1].value).toBe("a new lamborghini") 
		expect(inputs[0].value).toBe("")    
	 

	})

	test(" if edit button of an item  is clicked it shows buttons 'OK' and 'Cancel'  associated with the item", () => {
		const component = render(<App />)
		
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

		expect(item.parentElement).toHaveTextContent("OK")
		expect(item.parentElement).toHaveTextContent("Cancel") 

		expect(screen.getAllByText(/OK/)).toHaveLength(1) 
		expect(screen.getAllByText(/Cancel/)).toHaveLength(1)
	})

	test(`on edited item if user clicks OK button 
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

		const buttons = component.container.querySelectorAll('button')
		userEvent.click(buttons[1])
		expect(component.container.querySelectorAll("input")).toHaveLength(1)

		expect(screen.getByText(/a new lamborghini/)).toBeDefined()
	
 
	})
 

	test(`on edited item if user press enter key
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

		
	test(`on edited item if user clicks Cancel button  
	the item is not changed and shows a div not an input`, () => {
		
		const component = render(<App />)
		
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
		userEvent.click(item.parentElement.querySelectorAll("button")[1])  

		expect(component.container.querySelectorAll("input")).toHaveLength(1)
		expect(component.container).toHaveTextContent("1 package of toilet paper")
	

	})

	test("user can only edit one item at a time, click on Edit of a second item does nothing", () => {
		const component = render(<App />)
		
		const input = component.container.querySelector("input")	
		userEvent.type(input, "1 package of toilet paper")
			
		const button = screen.getByText(/Submit/);
		userEvent.click(button)

		userEvent.type(input, "10 bananas")
		userEvent.click(button)
 
		userEvent.type(input, "a package of face masks") 
		userEvent.click(button)

		const item = screen.getByText("1 package of toilet paper") 
		userEvent.click(item.parentElement.querySelector("button")) 

		const item2 = screen.getByText("10 bananas")	
		userEvent.click(item2.parentElement.querySelector("button"))

		expect(component.container.querySelectorAll("input")).toHaveLength(2) 
	})

	test("on editing mode any other item is not allowed to be sent to history", () => {
		const component = render(<App></App>)
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/))  
	
		userEvent.type(component.container.querySelector("input"), "1 kg of bananas")
		userEvent.click(screen.getByText(/Submit/)) 

		userEvent.type(component.container.querySelector("input"), "1 kg of strawberries")
		userEvent.click(screen.getByText(/Submit/)) 

		const item = screen.getByText("1 kg of sugar") 
		userEvent.click(item.parentElement.querySelector("button"))  

		userEvent.click(screen.getByText("1 kg of bananas")) 
		expect(component.container).toHaveTextContent("1 kg of bananas")
	}) 

	test("on editing mode any other item is not allowed to be removed", () => {
		const component = render(<App></App>)
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/))  
	
		userEvent.type(component.container.querySelector("input"), "1 kg of bananas")
		userEvent.click(screen.getByText(/Submit/)) 

		userEvent.type(component.container.querySelector("input"), "1 kg of strawberries")
		userEvent.click(screen.getByText(/Submit/)) 

		const item = screen.getByText("1 kg of sugar") 
		userEvent.click(item.parentElement.querySelector("button"))  

		userEvent.click(screen.getAllByText(/Remove/)[1])  
		expect(component.container).toHaveTextContent("1 kg of strawberries")
	}) 

	 
	test(`on  an item  remove button click y removes the associated item from the list`, () => {
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
		expect(component.container).not.toHaveTextContent("1 kg of bananas")  
		expect(component.container).not.toHaveTextContent("1 kg of strawberries")  

	})

})


describe("for both single item or multiple items on the list", () => {
	beforeEach(() => {
    	localStorage.clear()

  })

	afterEach(() => cleanup())



	test("on page refresh the list items persist", () => {
	   
	
		let component = render(<App></App>) 
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/)) 
	
		userEvent.type(component.container.querySelector("input"), "1 kg of bananas")
		userEvent.click(screen.getByText(/Submit/)) 

		userEvent.type(component.container.querySelector("input"), "1 kg of strawberries")
		userEvent.click(screen.getByText(/Submit/))
		//component.debug()
		component.unmount()    
	//	component.debug() 
		component = render(<App></App>)   
	//	component.debug()
		expect(component.container).toHaveTextContent("1 kg of sugar")  
		expect(component.container).toHaveTextContent("1 kg of bananas")  
		expect(component.container).toHaveTextContent("1 kg of strawberries")  
		
	
	 
	})

	test("when item is added it shows a notification with the text 'item added' for 5 seconds", () => {
		jest.useFakeTimers() 
		
		const component = render(<App></App>) 
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/)) 

		expect(component.container).toHaveTextContent("Item added!")  

		act(() => {
			jest.advanceTimersByTime(5000) 
		})
		

		expect(component.container).not.toHaveTextContent("Item added!")  

	})

	test("when item remove button is clicked is deleted it shows a notification with the text 'item deleted' for 5 seconds", () => {
		jest.useFakeTimers()

		let component = render(<App></App>) 
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/)) 

		const item = screen.getByText(/1 kg of sugar/)
		userEvent.click(item.parentElement.querySelectorAll("button")[1]) 
 
		expect(component.container).not.toHaveTextContent("Item added!")  
		expect(component.container).toHaveTextContent("Item removed from list!")  

	  

		act(() => {
			jest.advanceTimersByTime(5000)
		})
		 

		expect(component.container).not.toHaveTextContent("Item removed from list!")  
	})

	test("when all items are deleted with button 'clear all' it shows a notification with the text 'all items deleted' for 5 seconds", () => {
		jest.useFakeTimers()

		const component = render(<App></App>) 
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/)) 
		userEvent.click(screen.getByText(/Clear All/))

		expect(component.container).toHaveTextContent("List cleared!")  
	
	
		act(() => {
			jest.advanceTimersByTime(5000)
		})

		expect(component.container).not.toHaveTextContent("List cleared!")  
	})

	test("when item is edited it shows a notification with the text 'item edited' for 5 seconds", () => {
		jest.useFakeTimers()
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

		const buttons = component.container.querySelectorAll('button')
		userEvent.click(buttons[1])

		expect(component.container).toHaveTextContent("Item Edited!")   
	
	
		act(() => {
			jest.advanceTimersByTime(5000)
		})

		expect(component.container).not.toHaveTextContent("Item Edited!") 
	})



	test("when item text is clicked it shows a notification with the text 'item purchased moved to history' for 5 seconds", () => {
		jest.useFakeTimers()
		const component = render(
				<App />
			)
		
		const input = component.container.querySelector("input")	
		userEvent.type(input, "1 package of toilet paper")
			
		const button = screen.getByText(/Submit/);
		userEvent.click(button)

		const item = screen.getByText("1 package of toilet paper") 
		userEvent.click(item)

		expect(component.container).toHaveTextContent("Item purchased! Moved to history")   
	
	
		act(() => {
			jest.advanceTimersByTime(5000)
		})

		expect(component.container).not.toHaveTextContent("Item purchased! Moved to history") 


	})

  test("when user  add multiple items notification is updated for the last item added and it is shown correctly", () => {
		jest.useFakeTimers() 
		
		const component = render(<App></App>) 
		userEvent.type(component.container.querySelector("input"), "1 kg of sugar")
		userEvent.click(screen.getByText(/Submit/)) 

		act(() => {
			jest.advanceTimersByTime(4000) 
		})	

		expect(component.container).toHaveTextContent("Item added!")  
 
		userEvent.type(component.container.querySelector("input"), "bananas") 
		userEvent.click(screen.getByText(/Submit/)) 

		expect(component.container).toHaveTextContent("Item added!") 

		act(() => {
			jest.advanceTimersByTime(1000) 
		})	

		expect(component.container).toHaveTextContent("Item added!")  

		act(() => {
			jest.advanceTimersByTime(1000) 
		})	

		expect(component.container).toHaveTextContent("Item added!")  

		act(() => {
			jest.advanceTimersByTime(1000) 
		})	

		expect(component.container).toHaveTextContent("Item added!")  

		act(() => {
			jest.advanceTimersByTime(1000) 
		})	

		expect(component.container).toHaveTextContent("Item added!")  

		act(() => {
			jest.advanceTimersByTime(1000) 
		})	

		expect(component.container).not.toHaveTextContent("Item added!")  

		
	})

	test("when item text is clicked(sent to history) it shows an undo icon ", () => {
		const component = render(<App></App>) 
		userEvent.type(component.container.querySelector("input"), "bananas")
		userEvent.click(screen.getByText(/Submit/)) 		
		userEvent.click(screen.getByText("bananas")) 
		expect(component.container).toHaveTextContent("undo")  

	})

	test("undo icon is visible for 8 seconds ", () => {
		jest.useFakeTimers() 
		const component = render(<App></App>) 
		userEvent.type(component.container.querySelector("input"), "bananas")
		userEvent.click(screen.getByText(/Submit/)) 		
		userEvent.click(screen.getByText("bananas")) 
		 
		act(() => {
			jest.advanceTimersByTime(8000) 
		})	

		expect(component.container).not.toHaveTextContent("undo")
	})

// 	test("when undo icon is clicked the item just deleted is returned to the list ", () => {
	
// 	})

// 	test("when at least one item is finished the history | list option is showed ", () => {
	
// 	})
 

// 	test("on history link is clicked the history tab is showed ", () => {
		
// 	})

// 	test("when user selects history tab it shows a list with all purchased items most recent at top ", () => {
		
// 	})

	test("when user clicks 'clear all' with empty list it does not show any notification", () => {
		const component = render(<App></App>) 
		userEvent.click(screen.getByText(/Clear All/))

		expect(component.container).not.toHaveTextContent("List cleared!")  

	})
	



})


