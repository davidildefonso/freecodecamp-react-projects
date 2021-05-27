import React, {useState, useEffect} from 'react'
import { saveItemsToLocalStorage, getItemsFromLocalStorage} from '../../Utils/Functions' 

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
			if(updateHistoryList.type === "addItem"){
				addItemToHistory(updateHistoryList.body)		
			}  
		} 
	},[updateHistoryList.state])

	const addItemToHistory = (newItem) => {
		setHistoryItems(historyItems.concat(newItem)) 
		setUpdateHistoryList({state: false, action: null, id: null, body: null})
	}

	const removeItemFromHistoryList = (id) => {
		saveItemsToLocalStorage(historyItems.filter(item => 
			item.id !== id  ), "history")
		setHistoryItems(getItemsFromLocalStorage("history"))
		setUpdateHistoryList({state: false, action: null, id: null, body: null})
	}  

	return (
		<div>
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
		</div>
	)
} 

export default History
