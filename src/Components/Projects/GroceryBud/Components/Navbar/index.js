import React from 'react'
import {Container} from './Elements'




const Navbar = ({setShowHistory}) => {

	const displayHistorySection = () => { 
		setShowHistory(true)		
	}

	const displayListSection = () => {
		setShowHistory(false)
	} 

	return (
		<Container>
			<span
				onClick={displayListSection}  
			>List</span>
			<span>|</span> 
			<span
				onClick={displayHistorySection}
			>History</span> 
		</Container>
	)
}

export default Navbar
