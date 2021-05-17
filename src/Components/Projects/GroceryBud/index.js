import React, { useState, useRef, useEffect } from 'react'


const GroceryBudApp = () => {
	const [text, setText] = useState("")
	const [showList, setShowList] = useState(false)
	const [items, setItems] = useState([])
	const [editing, setEditing] = useState(false)
	const [inputText, setInputText] = useState({id: null, value: ""})
	const inputRef = useRef(null)
	const [showItemInput, setShowItemInput] = useState({id: null, state: false})

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

	

	const removeItem = () => console.log("")

	const handleEditChange = (text, id) => {
		setEditing(true)
		setInputText({id: id, value: text})
	}

	useEffect(() => {
		if(inputRef.current){
			inputRef.current.focus()
			inputRef.current.select() 
		}

	},[showItemInput])

	const handleEditClick = (id) => {
	
		if(!editing)	setShowItemInput( { id: id, state: true })
		else {
			setItems([...items].map(item => 
				item.id === id
					? {...item, text: inputText.value}
					: item
			))
			setEditing(false)
			setShowItemInput({id: null, state: false})
		} 
	
	}

	const handleEditKeyDownConfirm = (id,e) => {
		if(editing && e.keyCode === 13){
			setItems([...items].map(item => 
				item.id === id
					? {...item, text: inputText.value}
					: item
			))
			setEditing(false)
			setShowItemInput({id: null, state: false})
		
		}
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
							:  showItemInput.id === item.id
								?	<div>
										<input 
											ref={inputRef}
											value ={editing ? inputText.value :  item.text}
											onChange = {(e) => handleEditChange(e.target.value, item.id) }
											onKeyDown = {(e) => handleEditKeyDownConfirm(item.id, e)}
										></input> 
									</div>
									: <div 	
											onClick={() => removeItemFromListButKeepOnHistory(item.id)}
										>{item.text}</div>
						}
				
						<button
							onClick={() => handleEditClick(item.id) }
						>Edit</button> 
						<button onClick={removeItem}>Remove</button>
					</div>)
				
				)}
			</div>
		}
		<button>Clear All</button>
		</>
	)
}

export default GroceryBudApp
