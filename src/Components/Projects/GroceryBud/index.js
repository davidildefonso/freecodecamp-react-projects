import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import History from './Components/History'
import List from './Components/List'
import Notification from './Components/Notification'

const GroceryBudApp = () => {

	const [notification, setNotification] = useState("")
	const [items, setItems] = useState([])
	//const [showNavbar, setShowNavbar] = useState(false)
	const [showHistory, setShowHistory] = useState(false) 
	const [historyItems, setHistoryItems] = useState([])

	const displayHistorySection = () => {
		setShowHistory(true)
		setHistoryItems(getItemsFromLocalStorage("history"))
	}

	const displayListSection = () => {
		setShowHistory(false)
	} 

 	const getItemsFromLocalStorage = (field= "items") => {	
		if(localStorage.getItem(field))	return JSON.parse(localStorage.getItem(field))
		else return []		
	} 
	
	return (  
		<> 
		<h1>GROCERY BUD</h1>
		<Notification
			notification = {notification}
		></Notification>
		{/* { showNavbar &&  */}
		<Navbar
			handleListLinkClick = {displayListSection}
			handleHistoryLinkClick = {displayHistorySection}
		></Navbar>
		{/* // } */}
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
 
export default GroceryBudApp