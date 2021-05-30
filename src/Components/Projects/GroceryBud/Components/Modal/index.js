import React from 'react'
import { Container , Span, Form, FormInnerContainer, FormH1, FormP, FormButtonsContainer } from './Elements'
import Button from '../Button'

const Modal = ({showModal, removeItem, cancelRemoveItem}) => {



	return (
		<>
			{showModal &&  
				<Container onClick = {cancelRemoveItem}  >
					<Span color="#fff" position="absolute"
						onClick = {cancelRemoveItem}
					>×</Span>
				 
						<Form>
							<FormInnerContainer>
								<FormH1>Confirm Delete <Span color="#000"  position="relative" >×</Span> </FormH1>
								<FormP>Are you sure you want to delete the item from list?</FormP>							
								<FormButtonsContainer> 
									<Button
										handleClick =  {removeItem}
										text="Yes"
										type="Modal"
									></Button>
									<Button
										handleClick = {cancelRemoveItem}
										text="No"
										type="Modal"
									></Button>
								</FormButtonsContainer>
							</FormInnerContainer>
						</Form>
	
					
				</Container>
			}
		</>
	)
}

export default Modal
