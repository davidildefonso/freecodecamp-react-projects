import React, { useState } from 'react'


const GroceryBudApp = () => {
	const [text, setText] = useState("")
	const [showList, setShowList] = useState(false)
	const [item, setItem] = useState(null)

	const handleSubmit = (e) => {
		e.preventDefault()
		setShowList(true)
		setItem(text)
		setText("")
	}

	return (
		<>
		<h1>GROCERY BUD</h1>
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
		
		{showList &&
			<div>
				<div>{item}</div>
				<button>Edit</button>
				<button>Remove</button>
			</div>
		}

		</>
	)
}

export default GroceryBudApp
