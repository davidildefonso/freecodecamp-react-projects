import React from 'react'

const Navbar = ({handleListLinkClick, handleHistoryLinkClick}) => {
	return (
		<div>
			<span
				onClick={handleListLinkClick}
			>List</span>
			<span>|</span> 
			<span
				onClick={handleHistoryLinkClick}
			>History</span> 
		</div>
	)
}

export default Navbar
