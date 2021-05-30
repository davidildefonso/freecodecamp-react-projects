import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Components/Navbar'
import Notification from './Components/Notification'
import MainContent from './Components/MainContent'
import { Container, Title , Span, Icon } from './Elements'
import { getWindowWidth } from './Utils/Functions'
import  {GiSlicedBread} from 'react-icons/gi'

const GroceryBudApp = () => {

	const [notification, setNotification] = useState("")
	const [showHistory, setShowHistory] = useState(false) 	
	const ref = useRef({})

 
	const saveWindowWidth = () => {
		const width = getWindowWidth()
		ref.current.windowWidth = width
	
	}

	window.addEventListener("resize", saveWindowWidth)  
	 

	useEffect(() => {
		if(ref.current.windowWidth >= 992){
			setShowHistory(true) 		 
		}
		return () => {
			
		}
	}, [ref.current.windowWidth])

	return (  
		<Container> 
			<Title>GROCERY <Span> BUD  <Icon> <GiSlicedBread></GiSlicedBread></Icon> </Span></Title>
			<Notification
				notification = {notification}
			></Notification>
			<Navbar
				showHistory = {showHistory}
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