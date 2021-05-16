import React, { useState } from 'react'
import Note from './Components/Note'
import Login from './Components/Login'
import NoteForm from './Components/NoteForm'

const GroceryBudApp = () => {
	const [note, setNote] = useState({ important : false, content: "A test text for this"})
	const toggleImportance = () => setNote({...note, important: !note.important})
	
	const onSubmit = (userCredentials) => {
		console.log(userCredentials)
	}

	const createNote = (text) => {
		if(text) return text
	} 


	return (
		<>
			<h1>GROCERY BUD</h1>
			<Note note = {note} toggleImportance = {toggleImportance}>
			
			</Note>
			<Login
				onSubmit={onSubmit}
			></Login>
			<NoteForm createNote= {createNote}></NoteForm>
		</>
	)
}

export default GroceryBudApp
