import React, {useState, useEffect} from 'react'
import { saveItemsToLocalStorage, getItemsFromLocalStorage, insertItemAtPosition} from '../../Utils/Functions' 
import { Container, Title,  IconWrap, ItemsWrap, ItemsUl, ItemsLi, BagWrap, ButtonWrap} from './Elements'
import { BsBag } from 'react-icons/bs'
import Button from '../Button'


const History = ({updateHistoryList, showHistory, setUpdateHistoryList}) => {

	const [historyItems, setHistoryItems] = useState([])	

	useEffect(() => {
		setHistoryItems(getItemsFromLocalStorage("history")) 

	}, [])


	useEffect(() => {
		showHistory && setHistoryItems(getItemsFromLocalStorage("history")) 

	}, [showHistory])

	useEffect(() => {	
		if(updateHistoryList.state) {
			if(updateHistoryList.action === "remove"){			
				removeItemFromHistoryList(updateHistoryList.id)				 
			}
			if(updateHistoryList.action === "addItem"){
		
				addItemToHistory(updateHistoryList.body)		
			}  
		} 
	},[updateHistoryList.state])

	const addItemToHistory = (newItem) => {
		setHistoryItems(insertItemAtPosition(historyItems, newItem, 0)) 		
		saveItemsToLocalStorage(insertItemAtPosition(historyItems, newItem, 0), "history")
		setUpdateHistoryList({state: false, action: null, id: null, body: null})
	}

	const removeItemFromHistoryList = (id) => {
		saveItemsToLocalStorage(historyItems.filter(item => 
			item.id !== id  ), "history")
		setHistoryItems(getItemsFromLocalStorage("history"))
		setUpdateHistoryList({state: false, action: null, id: null, body: null})
	}  

	const emptyBag = () => console.log("empty bag items")

	

	return (
		<Container showHistory = {showHistory} >
			<BagWrap showHistory = {showHistory} >
				<Title>BAG</Title>
				<IconWrap><BsBag></BsBag></IconWrap>
				<ItemsWrap>
					<ItemsUl>
						{historyItems.map(item => 				
							<ItemsLi 
								key={item.id}>
								{item.text}
								
							</ItemsLi>							
						)}
					</ItemsUl>
					
				</ItemsWrap>
				<ButtonWrap>
					<Button text="Empty bag" type="Modal" handleClick={emptyBag}></Button>
				</ButtonWrap>
			
			</BagWrap>

		</Container> 
	)
} 

export default History
