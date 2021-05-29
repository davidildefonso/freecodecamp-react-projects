import React from 'react'
import {ButtonWrapper, Icon, Text} from './Elements'

const Button = ({handleClick, text, children}) => {
	return (
		<ButtonWrapper
			onClick={handleClick}	
		>
			<Icon>{children}</Icon>	
			<Text>{text}</Text>			
		</ButtonWrapper>
	)
}

export default Button


