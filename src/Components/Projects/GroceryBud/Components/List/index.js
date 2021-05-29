import React, {useState, useEffect, useRef} from 'react'
import Modal from '../Modal'
import UndoIcon from '../Undo'
import NewItemForm from '../NewItemForm'
import ItemsList from '../ItemsList'
import { saveItemsToLocalStorage, getItemsFromLocalStorage} from '../../Utils/Functions' 
import { Container } from './Elements'

const List = ({setUpdateHistoryList, setNotification, updateHistoryList, showHistory }) => { 
	
	const [items, setItems] = useState([]) 
	const [showUndo, setShowUndo] = useState(false) 
	const [text, setText] = useState("")
	const [editing, setEditing] = useState(false)
	const ref = useRef({})
	const [lastItemSentToHistory, setLastItemSentToHistory] = useState(null)
//		setLastItemSentToHistory({...itemClicked, index})	 		
	const [showModal, setShowModal] = useState(false)
	const [itemIdToBeDeleted, setItemIdToBeDeleted] = useState(null)

 	useEffect(() => {
		setItems(getItemsFromLocalStorage())	
	},[]) 

	useEffect(() => {

	
		if(updateHistoryList.state){		
			if(updateHistoryList.action === "addItem"){
				setLastItemSentToHistory({...updateHistoryList.body, index: updateHistoryList.index})
			}
			if(updateHistoryList.action === "remove"){
				setLastItemSentToHistory(null)
			}
			
		}
		
		return () => {
			 
		}
	}, [updateHistoryList.state])

	useEffect(() => {
	
		if(lastItemSentToHistory) {	
			setShowUndo(true)
			
		
		}else setShowUndo(false) 
		//else  setShowUndo(false) //setShowNavbar(false)
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
		setUpdateHistoryList({state: true, action: "remove", id: id})
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
	 	
		insertItemAtPosition(
			lastItemSentToHistory.text,
		 	lastItemSentToHistory.id,
		 	lastItemSentToHistory.index 
		)		
		removeItemFromHistoryList(lastItemSentToHistory.id)   
		setLastItemSentToHistory({index: null})
		
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
		<Container showHistory = {showHistory}>			 
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
				// setLastItemSentToHistory = {setLastItemSentToHistory}
				updateNotification = {updateNotification}
				setShowModal = {setShowModal}
				setItemIdToBeDeleted = {setItemIdToBeDeleted}
				setUpdateHistoryList = {setUpdateHistoryList}
			></ItemsList>

			<button
				onClick={handleClearAll}
			>Clear All</button>

			<Modal
				showModal = {showModal}
				removeItem = {removeItem}
				cancelRemoveItem = {cancelRemoveItem}
			></Modal>
		

				
		</Container>
	)
}

export default List
