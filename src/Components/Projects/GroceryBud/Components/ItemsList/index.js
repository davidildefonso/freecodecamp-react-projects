import React, {useState, useRef, useEffect} from 'react'
import { saveItemsToLocalStorage, getItemsFromLocalStorage} from '../../Utils/Functions' 
import Button from '../Button'
import { BiEditAlt } from 'react-icons/bi'
import { ImCancelCircle } from 'react-icons/im'
import { GiConfirmed } from 'react-icons/gi'
import { FaTimes } from 'react-icons/fa'
import { SingleItem, ItemText , Input, Container } from './Elements'



const ItemsList = ({items, setItems, editing, setEditing, setLastItemSentToHistory,
	updateNotification , setShowModal, setItemIdToBeDeleted, setUpdateHistoryList
}) => { 

	const inputRef = useRef(null) 
	const [showItemInput, setShowItemInput] = useState({id: null, state: false})
	const [editInputValue, setEditInputValue] = useState({id: null, value: ""})
 
	 
	useEffect(() => {
		if(inputRef.current){
			inputRef.current.focus()
			inputRef.current.select() 
		}

	},[showItemInput])


	
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
			setUpdateHistoryList({state: true, action: "addItem", id: id ,body: itemClicked, index: index})
		//	setLastItemSentToHistory({...itemClicked, index})	 		
			updateNotification("Item purchased! Moved to history") 	
		}
	}

	return (			
		<Container>
			{items &&  items.map(item => 				

				<SingleItem 
					key={item.id}>
				
					{!showItemInput.state 
						?	<ItemText 	
								onClick={() => removeItemFromListButKeepOnHistory(item.id)}
							>{item.text}</ItemText>
						:  showItemInput.id === item.id
							?	<ItemText>
									<Input 
										ref={inputRef}
										value ={editInputValue.value}
										onChange = {(e) => handleEditInputChange(e.target.value, item) }
										onKeyDown = {(e) => confirmEditItemWithEnterKey(item, e)}
									></Input> 
								</ItemText>
							: <ItemText 	
									onClick={() => removeItemFromListButKeepOnHistory(item.id)}
								>{item.text}</ItemText>
					}
					{editing && showItemInput.id === item.id
						? <>
								<Button
									handleClick={() => confirmEditItemWithClick(item.id, item.value) }
									text = "OK"
								>
									<GiConfirmed></GiConfirmed>
								</Button> 
								<Button 
									handleClick={() => cancelItemEdition(item.id)}
									text  = "Cancel"
								>
									<ImCancelCircle></ImCancelCircle>
								</Button>
						</>
					:	<>
							<Button
								handleClick={() => startEditingItem(item.id) }
								text  = "Edit"
							>	
								<BiEditAlt></BiEditAlt>
							
							</Button>  
							<Button 
								handleClick={() => showRemoveItemConfirmationModal(item.id)}
								text  = "Remove"
							>			<FaTimes></FaTimes></Button>
						</>
					}
			
				</SingleItem>
			
			
			)}
		</Container>	
	)
}

export default ItemsList
