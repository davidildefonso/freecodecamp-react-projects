import React, {useState, useEffect, useRef} from 'react'
import Modal from '../Modal'

const List = ({items, setItems, getItemsFromLocalStorage,
	historyItems, setHistoryItems, setNotification 
}) => {

	const [showUndo, setShowUndo] = useState(false) 
	const [text, setText] = useState("")
	const [editing, setEditing] = useState(false)
	const [editInputValue, setEditInputValue] = useState({id: null, value: ""})
	const inputRef = useRef(null) 
	const [showItemInput, setShowItemInput] = useState({id: null, state: false})
	const ref = useRef({})
	const [lastItemSentToHistory, setLastItemSentToHistory] = useState(null)
	const [showModal, setShowModal] = useState(false)
	const [itemIdToBeDeleted, setItemIdToBeDeleted] = useState(null)

 	useEffect(() => {
		setItems(getItemsFromLocalStorage())	
		setHistoryItems(getItemsFromLocalStorage("history"))	
	},[]) 
	
	const saveItemsToLocalStorage = (items, field = "items") => {
		localStorage.setItem(field, JSON.stringify(items))
	}

	useEffect(() => {
		if(lastItemSentToHistory) {	
			//setShowNavbar(true)
			const currentItems = getItemsFromLocalStorage("history")
			const newItem = [lastItemSentToHistory]	
			saveItemsToLocalStorage( newItem.concat(currentItems) , "history")
		} 
	//	else setShowNavbar(false)
	},[lastItemSentToHistory])



	useEffect(() => {
		if(lastItemSentToHistory) setShowUndo(true)
	},[lastItemSentToHistory]) 




	const removeItem = (e) => { 
		e.preventDefault()
		if(itemIdToBeDeleted){
			saveItemsToLocalStorage([...items].filter(item => 
				item.id !== itemIdToBeDeleted  ))
			setItems(getItemsFromLocalStorage())
			updateNotification("Item removed from list!")
			setShowModal(false)

		}	
	} 

	const removeItemFromHistoryList = (id) => {
			saveItemsToLocalStorage(historyItems.filter(item => 
				item.id !== id  ), "history")
			setHistoryItems(getItemsFromLocalStorage("history"))
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

	
	
	const updateNotification = (str) => {
	
		if(ref.current.timeout) clearTimeout(ref.current.timeout)  
		setNotification(str)
	
		ref.current.timeout =  setTimeout(() => {
				setNotification("")
			
		}, 5000) 
	}


	const handleSubmit = (e) => {
		e.preventDefault()
		const id = new Date().getTime().toString()
		if(text){	
			addItem(text,id)			 
		}		 
	} 

	const addItem = (content, id) => {
		saveItemsToLocalStorage(items.concat({
				id: id,
				text: content
			}))
			
		setItems(getItemsFromLocalStorage())	
	
		setText("")
		setEditing(false)
		updateNotification("Item added!")
	}

	const handleEditInputChange = (text, item) => {
		setEditing(true)
		setEditInputValue({id: item.id, value: text})
	}

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
		insertItemAtPosition(lastItemSentToHistory.text,
		 lastItemSentToHistory.id,
		 lastItemSentToHistory.index)
		removeItemFromHistoryList(lastItemSentToHistory.id)   
	}


	const showRemoveItemConfirmationModal = (id) => {
		setShowModal(true)
		setItemIdToBeDeleted(id)
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
		
			setHistoryItems(historyItems.concat(itemClicked))
			setLastItemSentToHistory({...itemClicked, index})	 		
			updateNotification("Item purchased! Moved to history")
 	
		}
	}

	useEffect(() => {	
		let undoTimeout 
		
		if(showUndo){		
			undoTimeout =  setTimeout(() => setShowUndo(false), 8000) 
			
		}
    return () => {
			clearTimeout(undoTimeout)
		} 
	}, [showUndo]) 


	 
	useEffect(() => {
		if(inputRef.current){
			inputRef.current.focus()
			inputRef.current.select() 
		}

	},[showItemInput])





	const cancelRemoveItem = (e) => {
		e.preventDefault()
		setShowModal(false)
	}



	return (
		<div>			 
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
					{items &&  items.map(item => 				

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
									<button 
										onClick={() => showRemoveItemConfirmationModal(item.id)}
									>Remove</button>
								</>
							}
					
						</div>
					
					
					)}
				</div>
			}
			<button
				onClick={handleClearAll}
			>Clear All</button>

			<Modal
				showModal = {showModal}
				removeItem = {removeItem}
				cancelRemoveItem = {cancelRemoveItem}
			></Modal>
		

				
		</div>
	)
}

export default List
