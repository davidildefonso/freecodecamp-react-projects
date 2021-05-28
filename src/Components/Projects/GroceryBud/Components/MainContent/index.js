import React, { useState, useEffect } from 'react'
import History from '../History'
import List from '../List' 
import { Container } from './Elements' 
import { getWindowWidth } from '../../Utils/Functions'

const MainContent = ({showHistory, setNotification}) => {  

	const [updateHistoryList, setUpdateHistoryList] = useState({
		state: false, action: null, id: null })

	return (
		<Container>
		{/* { !showHistory 
			?  */}
	
				 <List			
					setNotification = {setNotification}	 	
					setUpdateHistoryList = {setUpdateHistoryList}
				></List>
			{/* :  */}
					<History
					updateHistoryList = {updateHistoryList}
					showHistory = {showHistory}
					setUpdateHistoryList = {setUpdateHistoryList}
				></History>
		
		{/* } */}
		</Container>
	)
}

export default MainContent
