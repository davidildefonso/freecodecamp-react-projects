import React, {useState, useEffect} from 'react'
import { saveItemsToLocalStorage, getItemsFromLocalStorage, insertItemAtPosition} from '../../Utils/Functions' 
import { Container } from './Elements'

const History = ({updateHistoryList, showHistory, setUpdateHistoryList}) => {

	const [historyItems, setHistoryItems] = useState([])	

	useEffect(() => {
		showHistory && setHistoryItems(getItemsFromLocalStorage("history")) 

	}, [showHistory])

	useEffect(() => {	
		if(updateHistoryList.state) {
			if(updateHistoryList.action === "remove"){			
				removeItemFromHistoryList(updateHistoryList.id)				 
			}
			if(updateHistoryList.action === "addItem"){
		
				addItemToHistory(updateHistoryList.body)		
			}  
		} 
	},[updateHistoryList.state])

	const addItemToHistory = (newItem) => {
		setHistoryItems(insertItemAtPosition(historyItems, newItem, 0)) 		
		saveItemsToLocalStorage(insertItemAtPosition(historyItems, newItem, 0), "history")
		setUpdateHistoryList({state: false, action: null, id: null, body: null})
	}

	const removeItemFromHistoryList = (id) => {
		saveItemsToLocalStorage(historyItems.filter(item => 
			item.id !== id  ), "history")
		setHistoryItems(getItemsFromLocalStorage("history"))
		setUpdateHistoryList({state: false, action: null, id: null, body: null})
	}  



	return (
		<Container showHistory = {showHistory} >
			<h3>HISTORY</h3>
			<div>
				<div>
					<div>ID</div>
					<div>ITEM</div>
				</div>
				
				<div> 
					{historyItems.map(item => 				
						<div 
							key={item.id}>
							{item.id} {item.text}							
						</div>							
					)}
				</div>
					
			</div>
		</Container> 
	)
} 

export default History
