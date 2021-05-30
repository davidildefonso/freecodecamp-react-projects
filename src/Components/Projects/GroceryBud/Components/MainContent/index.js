import React, { useState, useEffect } from 'react'
import History from '../History'
import List from '../List' 
import { Container } from './Elements' 
import { getWindowWidth } from '../../Utils/Functions'

const MainContent = ({showHistory, setNotification, setNotificationTop, notificationTop}) => {  

	const [updateHistoryList, setUpdateHistoryList] = useState({
		state: false, action: null, id: null })



	return (
		<Container>
				 <List			
					setNotification = {setNotification}	 	
					setUpdateHistoryList = {setUpdateHistoryList}
					updateHistoryList = {updateHistoryList}
					showHistory = {showHistory}
					setNotificationTop = {setNotificationTop}
					notificationTop = {notificationTop}
				></List>
		
					<History
					updateHistoryList = {updateHistoryList}
					showHistory = {showHistory}
					setUpdateHistoryList = {setUpdateHistoryList}
				></History>	

		</Container>
	)
}

export default MainContent
