import React, { useState} from 'react'
import History from '../History'
import List from '../List'  

const MainContent = ({showHistory, setNotification}) => {  

	const [updateHistoryList, setUpdateHistoryList] = useState({
		state: false, action: null, id: null })

	return (
		<>
		{ showHistory 
			? <History
					updateHistoryList = {updateHistoryList}
					showHistory = {showHistory}
					setUpdateHistoryList = {setUpdateHistoryList}
				></History>
			: <List			
					setNotification = {setNotification}	 	
					setUpdateHistoryList = {setUpdateHistoryList}
				></List>
		
		}
		</>
	)
}

export default MainContent
