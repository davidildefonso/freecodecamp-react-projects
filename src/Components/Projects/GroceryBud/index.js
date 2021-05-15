import React, { useState } from 'react'
import Note from './Components/Note'

const GroceryBudApp = () => {
	const [note, setNote] = useState({ important : false, content: "A test text for this"})
	const toggleImportance = () => setNote({...note, important: !note.important})
	
	return (
		<>
			<h1>GROCERY BUD</h1>
			<Note note = {note} toggleImportance = {toggleImportance}>
			
			</Note>
		</>
	)
}

export default GroceryBudApp
