import React, {useEffect, useState} from 'react'
import History from '../History'
import List from '../List'  

const MainContent = ({showHistory, setNotification}) => {  

	const [items, setItems] = useState([])
	const [historyItems, setHistoryItems] = useState([])

	useEffect(() => {
		showHistory && setHistoryItems(getItemsFromLocalStorage("history"))
	}, [showHistory])

	
 	const getItemsFromLocalStorage = (field= "items") => {	
		if(localStorage.getItem(field))	return JSON.parse(localStorage.getItem(field))
		else return []		
	} 

	return (
		<>
		{ showHistory 
			? <History
					items = {historyItems}
				></History>
			: <List
					items = {items}	
					setItems = {setItems}
					historyItems = {historyItems}
					setHistoryItems = {setHistoryItems}	
					setNotification = {setNotification}	 	
					getItemsFromLocalStorage = {getItemsFromLocalStorage}
				></List>
		
		}
		</>
	)
}

export default MainContent
