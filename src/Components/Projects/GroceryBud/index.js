import React, { useState, useRef, useEffect } from 'react'


const GroceryBudApp = () => {
	const [text, setText] = useState("")
	const [notification, setNotification] = useState("")
	const [items, setItems] = useState([])
	const [editing, setEditing] = useState(false)
	const [editInputValue, setEditInputValue] = useState({id: null, value: ""})
	const inputRef = useRef(null)
	const [showItemInput, setShowItemInput] = useState({id: null, state: false})
	const ref = useRef({})
	const [lastItemSentToHistory, setLastItemSentToHistory] = useState(null)
	const [showUndo, setShowUndo] = useState(false)
	

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
		const id = new Date().getTime().toString()
		if(text){	
			addItem(text,id)			
		}		 
	} 

	const addItem = (content, id) => {
	
		saveItemsToLocalStorage([...items].concat({
				id: id,
				text: content
			}))
		setItems(getItemsFromLocalStorage())		
		setText("")
		setEditing(false)
		updateNotification("Item added!")
	}

	const updateNotification = (str) => {
	
		if(ref.current.timeout) clearTimeout(ref.current.timeout)  
		setNotification(str)
	
		ref.current.timeout =  setTimeout(() => {
				setNotification("")
			
		}, 5000) 
	}

	const insertItemAtPosition = (content, id, position) => {
		const items1 = items.slice(0,position)
		const newItem =  {
				id: id,
				text: content
		}
		const items2 = items.slice(position,)
		const updatedItems = items1.concat(newItem).concat(items2)	
		saveItemsToLocalStorage(updatedItems)
		setItems(getItemsFromLocalStorage())	 	
		setText("")
		setEditing(false)
		updateNotification("Item added!")
		
	}

	const removeItemFromListButKeepOnHistory = (id) => {
		if(!editing){
			let index
			const itemClicked = items.find((item, idx) => {
				index = idx
				return item.id === id
			})				
			saveItemsToLocalStorage(items.filter(item => item !== itemClicked))		
			setItems(getItemsFromLocalStorage())
			setLastItemSentToHistory({...itemClicked, index})	 		
			updateNotification("Item purchased! Moved to history")
 	
		}
	}



	useEffect(() => {
		if(lastItemSentToHistory) setShowUndo(true)
	},[lastItemSentToHistory]) 

	useEffect(() => {	
		let undoTimeout 
		
		if(showUndo){		
			undoTimeout =  setTimeout(() => setShowUndo(false), 8000) 
			
		}
    return () => {
			clearTimeout(undoTimeout)
		} 
	}, [showUndo]) 

	const removeItem = (id) => {
		if(!editing){
			saveItemsToLocalStorage([...items].filter(item => 
				item.id !== id  ))
			setItems(getItemsFromLocalStorage())
			updateNotification("Item removed from list!")
		

		}	
	} 

	
	const handleEditInputChange = (text, item) => {
		setEditing(true)
		setEditInputValue({id: item.id, value: text})
	}
  
	useEffect(() => {
		if(inputRef.current){
			inputRef.current.focus()
			inputRef.current.select() 
		}

	},[showItemInput])

	const startEditingItem = (id) => {
		setShowItemInput( { id: id, state: true })
		setEditing(true)
		const value = items.find(i => i.id === id).text		
		setEditInputValue({...editInputValue, value: value})		
	}
 
	const confirmEditItemWithEnterKey = (item,e) => {
		if(editing && e.keyCode === 13){
			saveItemsToLocalStorage([...items].map(it => 
				item.id === it.id
					? {...it, text: editInputValue.value}
					: it
			))
			setItems(getItemsFromLocalStorage())
			setEditing(false)
			setShowItemInput({id: null, state: false})		
			updateNotification("Item Edited!")
			
		}
	}
 
	const handleClearAll = () => {
		if(items.length > 0){
			saveItemsToLocalStorage([])
			setItems([])	 
			updateNotification("List cleared!")
		
		}

	}

	const confirmEditItemWithClick = (id) => {	
		saveItemsToLocalStorage([...items].map(item => 
			item.id === id
				? {...item, text: editInputValue.value}
				: item
		))
		setItems(getItemsFromLocalStorage())
		setEditing(false)
		setShowItemInput({id: null, state: false})
		updateNotification("Item Edited!")
	
	}

	const cancelItemEdition = (id) => {
		setEditing(false)
		setShowItemInput({id: null, state: false})
	}
 
	const restoreLastItemFromHistory = () => {
	 	setShowUndo(false)
		insertItemAtPosition(lastItemSentToHistory.text, lastItemSentToHistory.id, lastItemSentToHistory.index)  
	}
  
	return (  
		<> 
		<h1>GROCERY BUD</h1>
		<h3>{notification}</h3> 
		{showUndo &&
		  <p
				onClick={restoreLastItemFromHistory}
			>undo</p>}   
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
		
		{
			<div>
				{items.length > 0 &&  items.map(item => 				

					<div 
						key={item.id}>
					
						{!showItemInput.state 
							?	<div 	
									onClick={() => removeItemFromListButKeepOnHistory(item.id)}
								>{item.text}</div>
							:  showItemInput.id === item.id
								?	<div>
										<input 
											ref={inputRef}
											value ={editInputValue.value}
											onChange = {(e) => handleEditInputChange(e.target.value, item) }
											onKeyDown = {(e) => confirmEditItemWithEnterKey(item, e)}
										></input> 
									</div>
								: <div 	
										onClick={() => removeItemFromListButKeepOnHistory(item.id)}
									>{item.text}</div>
						}
						{editing && showItemInput.id === item.id
							? <>
									<button
										onClick={() => confirmEditItemWithClick(item.id, item.value) }
									>OK</button> 
									<button onClick={() => cancelItemEdition(item.id)}>Cancel</button>
							</>
						:	<>
								<button
									onClick={() => startEditingItem(item.id) }
								>Edit</button> 
								<button onClick={() => removeItem(item.id)}>Remove</button>
							</>
						}
				
					</div>
				
				
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