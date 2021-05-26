import React, {useState, useEffect, useRef} from 'react'
import Modal from '../Modal'
import UndoIcon from '../Undo'
import NewItemForm from '../NewItemForm'
import ItemsList from '../ItemsList'

const List = ({items, setItems, getItemsFromLocalStorage,
	historyItems, setHistoryItems, setNotification 
}) => {

	const [showUndo, setShowUndo] = useState(false) 
	const [text, setText] = useState("")
	const [editing, setEditing] = useState(false)


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
			setShowUndo(true)
			const currentItems = getItemsFromLocalStorage("history")
			const newItem = [lastItemSentToHistory]	
			saveItemsToLocalStorage( newItem.concat(currentItems) , "history")
		} 
	//	else setShowNavbar(false)
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


	const handleClearAll = () => {

		if(items.length > 0){
			saveItemsToLocalStorage([])
			setItems([])	 
			updateNotification("List cleared!")
		
		}

	}

	

	const restoreLastItemFromHistory = () => {
	 	setShowUndo(false)
		insertItemAtPosition(lastItemSentToHistory.text,
		 lastItemSentToHistory.id,
		 lastItemSentToHistory.index)
		removeItemFromHistoryList(lastItemSentToHistory.id)   
	}




	 



	const cancelRemoveItem = (e) => {
		e.preventDefault()
		setShowModal(false)
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



	return (
		<div>			 
			<UndoIcon
				showUndo = {showUndo}
				restoreLastItemFromHistory = {restoreLastItemFromHistory}
			></UndoIcon>  
		
			<NewItemForm
				text = {text}
				setText = {setText}
				addItem = {addItem}
			></NewItemForm>

			<ItemsList
				items={items}
				setItems = {setItems}
				editing = {editing}
				setEditing = {setEditing}
				getItemsFromLocalStorage = {getItemsFromLocalStorage}
				saveItemsToLocalStorage = {saveItemsToLocalStorage}
				historyItems = {historyItems}
				setHistoryItems = {setHistoryItems}
				setLastItemSentToHistory = {setLastItemSentToHistory}
				updateNotification = {updateNotification}
				setShowModal = {setShowModal}
				setItemIdToBeDeleted = {setItemIdToBeDeleted}
			></ItemsList>

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
