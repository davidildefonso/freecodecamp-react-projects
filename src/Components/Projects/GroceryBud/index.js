import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Notification from './Components/Notification'
import MainContent from './Components/MainContent'

const GroceryBudApp = () => {

	const [notification, setNotification] = useState("")
	const [showHistory, setShowHistory] = useState(false) 	

	return (  
		<> 
		<h1>GROCERY BUD</h1>
		<Notification
			notification = {notification}
		></Notification>
		<Navbar
			setShowHistory = {setShowHistory}
		></Navbar>	
		<MainContent 
			showHistory={showHistory}
			setNotification = {setNotification}
		></MainContent>	
		</>
	)
}
 
export default GroceryBudApp