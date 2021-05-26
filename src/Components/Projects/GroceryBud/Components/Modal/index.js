import React from 'react'

const Modal = ({showModal, removeItem, cancelRemoveItem}) => {

	const modalStyle = {
		position: "fixed",
		zIndex: 10,
		width: "100vw",
		height: "100vh",
		top:0,		
		background : "rgba(0,0,0,0.4)" 

	} 

	return (
		<>
			{showModal &&  
				<div onClick = {cancelRemoveItem} style={modalStyle} >
					<span
						onClick = {cancelRemoveItem}
					>×</span>
					<form>
						<div>
							<h1>Confirm Delete</h1>
							<p>Are you sure you want to delete the item from list?</p>							
							<div> 
								<button
									onClick =  {removeItem}
								>Yes</button>
								<button
									onClick = {cancelRemoveItem}
								>No</button>
							</div>
						</div>
					</form>
				</div>
			}
		</>
	)
}

export default Modal
