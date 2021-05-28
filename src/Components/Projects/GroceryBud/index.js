import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Notification from './Components/Notification'
import MainContent from './Components/MainContent'
import { Container, Title } from './Elements'

const GroceryBudApp = () => {

	const [notification, setNotification] = useState("")
	const [showHistory, setShowHistory] = useState(false) 	

	return (  
		<Container> 
			<Title>GROCERY BUD</Title>
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
		</Container>
	)
}
 
export default GroceryBudApp