import React from 'react'
import {ButtonWrapper, Icon, Text} from './Elements'

const Button = ({handleClick, text, children, type}) => {




	return (
		<ButtonWrapper
			onClick={handleClick}	
		>
			<Icon type={type}>{children}</Icon>	
			<Text>{text}</Text>			
		</ButtonWrapper>
	)
}

export default Button


