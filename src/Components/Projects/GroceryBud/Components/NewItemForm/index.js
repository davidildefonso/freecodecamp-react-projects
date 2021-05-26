import React from 'react'

const NewItemForm = ({text, setText, addItem}) => {

	const handleSubmit = (e) => {
		e.preventDefault()
		const id = new Date().getTime().toString()
		if(text){	
			addItem(text,id)			 
		}		 
	} 

	return (
		<div>
			<form>
				<input 
					value = {text}
					placeholder="new item"
					onChange={(e) => setText(e.target.value)}
				></input>
				<button
					onClick={handleSubmit} 
				>Submit</button>
			</form> 
		</div>
	)
}

export default NewItemForm
