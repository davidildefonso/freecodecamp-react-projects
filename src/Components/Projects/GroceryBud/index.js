import React, { useState, useRef, useEffect } from 'react'


const GroceryBudApp = () => {
	const [text, setText] = useState("")
	const [showList, setShowList] = useState(true)
	const [items, setItems] = useState([])
	const [editing, setEditing] = useState(false)
	const [inputText, setInputText] = useState({id: null, value: ""})
	const inputRef = useRef(null)
	const [showItemInput, setShowItemInput] = useState({id: null, state: false})

	useEffect(() => {
		if(!getItemsFromLocalStorage()) setItems([])
		else setItems(getItemsFromLocalStorage())	
	},[])


	const saveItemsToLocalStorage = (items) => {
		localStorage.setItem("items", JSON.stringify(items))
	}

	const getItemsFromLocalStorage = () => 
		JSON.parse(localStorage.getItem("items"))


	const handleSubmit = (e) => {
		e.preventDefault()
		if(text){	
		
			saveItemsToLocalStorage([...items].concat({
				id: new Date().getTime().toString(),
				text: text
			}))
			setItems(getItemsFromLocalStorage())
			// setItems([...items].concat({
			// 	id: new Date().getTime().toString(),
			// 	text: text
			// }))
			setText("")
			setEditing(false)
		}
		
	}

	const removeItemFromListButKeepOnHistory = (id) => {
		saveItemsToLocalStorage([...items].filter(item => 
			item.id !== id  ))
		
		setItems(getItemsFromLocalStorage())
		 //setItems([...items].filter(item => 
		// 	item.id !== id  ))
	}

	

	const removeItem = (id) => {

		saveItemsToLocalStorage([...items].filter(item => 
			item.id !== id  ))
		// setItems([...items].filter(item => 
		// 	item.id !== id  ))
		setItems(getItemsFromLocalStorage())
	} 

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
		setShowItemInput( { id: id, state: true })
		setEditing(true)
		
		// if(!editing) {
		
		// }	else {
	
		// } 
	 
	}

	const handleEditKeyDownConfirm = (id,e) => {
		if(editing && e.keyCode === 13){
			saveItemsToLocalStorage([...items].map(item => 
				item.id === id
					? {...item, text: inputText.value}
					: item
			))
			setItems(getItemsFromLocalStorage())
			// setItems([...items].map(item => 
			// 	item.id === id
			// 		? {...item, text: inputText.value}
			// 		: item
			// ))
			setEditing(false)
			setShowItemInput({id: null, state: false})
		
		}
	}

	const handleClearAll = () => {
		saveItemsToLocalStorage([])
		setItems([])	 
	}

	const confirmEditItem = (id) => {
		saveItemsToLocalStorage([...items].map(item => 
			item.id === id
				? {...item, text: inputText.value}
				: item
		))
		setItems(getItemsFromLocalStorage())

		setEditing(false)
		setShowItemInput({id: null, state: false})
	}

	const cancelItemEdition = (id) => {
	
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
				{items.length > 0 &&  items.map(item => 				
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
											value ={editing 
												? inputText.value 
													? inputText.value 
													: item.text
												:  item.text}
											onChange = {(e) => handleEditChange(e.target.value, item.id) }
											onKeyDown = {(e) => handleEditKeyDownConfirm(item.id, e)}
										></input> 
									</div>
									: <div 	
											onClick={() => removeItemFromListButKeepOnHistory(item.id)}
										>{item.text}</div>
						}
						{editing
							? <>
									<button
										onClick={() => confirmEditItem(item.id) }
									>OK</button> 
									<button onClick={() => cancelItemEdition(item.id)}>Cancel</button>
							</>
						:	<>
								<button
									onClick={() => handleEditClick(item.id) }
								>Edit</button> 
								<button onClick={() => removeItem(item.id)}>Remove</button>
							</>
						}
				
					</div>)
				
				)}
			</div>
		}
		<button
			onClick={handleClearAll}
		>Clear All</button>
		</>
	)
}

export default GroceryBudApp