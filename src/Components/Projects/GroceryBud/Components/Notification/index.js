import React from 'react'
import { Content, Container } from './Elements'

const Notification = ({notification}) => {
	return (

		<Container>
				<Content>{notification}</Content>  
		</Container>
	
	)
}

export default Notification
