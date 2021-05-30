import React, { useState } from 'react'
import { MdAddCircle } from 'react-icons/md';
import Button from '../Button' 
import {Form, Container, Input} from './Elements'


const NewItemForm = ({text, setText, addItem}) => {

	const [color, setColor] = useState("#000")
	const [bgColor, setBgColor] = useState("#fff")

	const handleSubmit = (e) => {
		e.preventDefault()
		
		const id = new Date().getTime().toString()
		if(text){	
			addItem(text,id)			 
		}		 
	} 

	const toggleColor = () => {
		color === "#000" ? setColor("#fff") : setColor("#000")
		bgColor === "#000" ? setBgColor("#fff") : setBgColor("#000")
	}

	const styles = {
		
		borderRadius: "50%",
		background: bgColor,
		color: color,
		transition: "all ease-in-out 0.15s"

	}

	return ( 
		<Container>
			<Form>
				<Input 
					value = {text}
					placeholder="new item"
					onChange={(e) => setText(e.target.value)}
				></Input>
				<Button
					handleClick={handleSubmit} 
					text = "Add" 
					type= "add"
				>
						<MdAddCircle
							style = {styles}
							onMouseEnter = {toggleColor}
							onMouseLeave ={toggleColor}
							onMouseDown = {toggleColor}
							onMouseUp = {toggleColor}
						></MdAddCircle>
				</Button>
			
			</Form> 
		</Container>
	)
}

export default NewItemForm
