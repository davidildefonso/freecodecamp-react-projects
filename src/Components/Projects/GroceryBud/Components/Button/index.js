import React from 'react'
import {ButtonWrapper, Icon, Text} from './Elements'

const Button = ({handleClick, text, children, type}) => {




	return (
		<ButtonWrapper
			onClick={handleClick}	
			type={type}
		>
			<Icon type={type}>{children}</Icon>	
			<Text type={type} >{text}</Text>			
		</ButtonWrapper>
	)
}

export default Button


