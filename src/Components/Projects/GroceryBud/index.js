import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Components/Navbar'
import Notification from './Components/Notification'
import MainContent from './Components/MainContent'
import { Container, Title , Span, Icon } from './Elements'
import { getWindowWidth } from './Utils/Functions'
import  {GiSlicedBread} from 'react-icons/gi'

const GroceryBudApp = () => {

	const [notification, setNotification] = useState("")
	const [showNotification, setShowNotification] = useState(false)
	const [notificationTop, setNotificationTop] = useState(null)
	const [showHistory, setShowHistory] = useState(false) 	
	const ref = useRef({})

 
	const saveWindowWidth = () => {
		const width = getWindowWidth()
		ref.current.windowWidth = width
	
	}

	useEffect(() => {
		if(notification !== ""){
			setShowNotification(true)
		}else{
			setShowNotification(false)
		}
		return () => {
			
		}
	}, [notification])

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
				show = {showNotification}
				notificationTop = {notificationTop}
			></Notification>
			<Navbar
				showHistory = {showHistory}
				setShowHistory = {setShowHistory}
			></Navbar>	
			<MainContent 
				showHistory={showHistory}
				setNotification = {setNotification}
				setNotificationTop = {setNotificationTop}
				notificationTop= {notificationTop}
			></MainContent>	
		</Container>
	)
}
 
export default GroceryBudApp