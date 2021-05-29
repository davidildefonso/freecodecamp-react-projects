import React from 'react'
import { CgAdd } from 'react-icons/cg';
import Button from '../Button' 
import {Form} from './Elements'


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
			<Form>
				<input 
					value = {text}
					placeholder="new item"
					onChange={(e) => setText(e.target.value)}
				></input>
				<Button
					handleClick={handleSubmit} 
					text = "Add" 
				>
						<CgAdd></CgAdd>
				</Button>
			
			</Form> 
		</div>
	)
}

export default NewItemForm
