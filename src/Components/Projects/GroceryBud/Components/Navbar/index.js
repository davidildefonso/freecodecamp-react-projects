import React from 'react'
import {Container, List, History, Pipe} from './Elements'




const Navbar = ({showHistory , setShowHistory}) => {

	const displayHistorySection = () => { 
		setShowHistory(true)		
	}

	const displayListSection = () => {
		setShowHistory(false)
	} 

	return (
		<Container>
			<List
				show={!showHistory}
				onClick={displayListSection}  
			>List</List>
			<Pipe>|</Pipe> 
			<History
				show={showHistory}
				onClick={displayHistorySection}
			>History</History> 
		</Container>
	)
}

export default Navbar
