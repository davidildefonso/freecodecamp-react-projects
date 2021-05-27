import React from 'react'

const Navbar = ({setShowHistory}) => {

	const displayHistorySection = () => { 
		setShowHistory(true)		
	}

	const displayListSection = () => {
		setShowHistory(false)
	} 

	return (
		<div>
			<span
				onClick={displayListSection}  
			>List</span>
			<span>|</span> 
			<span
				onClick={displayHistorySection}
			>History</span> 
		</div>
	)
}

export default Navbar
