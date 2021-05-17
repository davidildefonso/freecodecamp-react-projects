import React, { useState, useRef, useEffect } from 'react'


const GroceryBudApp = () => {
	const [text, setText] = useState("")
	const [showList, setShowList] = useState(false)
	const [items, setItems] = useState([])
	const [editing, setEditing] = useState(false)

	const inputRef = useRef(null)

	const handleSubmit = (e) => {
		e.preventDefault()
		if(text){
			setShowList(true)
			setItems([...items].concat({
				id: new Date().getTime().toString(),
				text: text
			}))
			setText("")
			setEditing(false)
		}
		
	}

	const removeItemFromListButKeepOnHistory = (id) => {
		setItems([...items].filter(item => 
			item.id !== id  ))
	}

	const [showItemInput, setShowItemInput] = useState({id: null, state: false})

	const removeItem = () => console.log("")

	const handleEditChange = (text) => {
		setEditing(true)
		setText(text)
	}

	useEffect(() => {
		if(inputRef.current){
			inputRef.current.focus()
			inputRef.current.select() 
		}

	},[showItemInput])

	const handleEditClick = (id) => {
		setShowItemInput({id: id, state: true})
	
	}

	 

	return (
		<>
		<h1>GROCERY BUD</h1>
		<form>
			<input 
				value = {text}
				placeholder="new item"
				onChange={(e) => setText(e.target.value)}
			></input>
			<button
				onClick={handleSubmit} 
			>Submit</button>
		</form> 
		
		{showList &&
			<div>
				{items.map(item => 				
					(<div 
						key={item.id}>
						{!showItemInput.state  
							?	<div 	
									onClick={() => removeItemFromListButKeepOnHistory(item.id)}
								>{item.text}</div>
							: <div>
									<input 
										ref={inputRef}
										value ={editing ? text :  item.text}
										onChange = {(e) => handleEditChange(e.target.value) }
									></input> 
								</div>
						}
				
						<button
							onClick={() => handleEditClick(item.id) }
						>Edit</button>
						<button onClick={removeItem}>Remove</button>
					</div>)
				
				)}
			</div>
		}
 
		</>
	)
}

export default GroceryBudApp
