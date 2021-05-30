import styled from "styled-components";

export const Container = styled.div`

	position: fixed;
	z-index: 10;
	width: 100vw;
	height: 100vh;
	top:0;		
	background : rgba(0,0,0,0.4);
	display: flex;
	justify-content: center;
	align-items: center;
`

export const Span = styled.span`


	position: ${
			({  position	}) =>
					position
	};
	top:0;		
	left: 0;
	color: ${
			({  color	}) =>
					color
	};
	font-size: 40px;

	&:hover{
		cursor: pointer;
	}

`

export const Form = styled.div`

	background: #fff;
	width: 70%;
	border-radius: 10px;
	padding: 30px;
	
`

export const FormInnerContainer = styled.div`

	
	
`

export const FormButtonsContainer = styled.div`
	display: flex;
	justify-content: center;
	
`

export const FormP = styled.p`

	line-height: 1.7;
	margin-bottom: 20px;
	font-size: 20px;
`

export const FormH1 = styled.h1`

	margin-bottom: 20px;	
	
`