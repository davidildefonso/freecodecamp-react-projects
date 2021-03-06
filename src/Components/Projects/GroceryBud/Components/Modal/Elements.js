import styled from "styled-components";

export const Container = styled.div`

	position: fixed;
	z-index: 10;
	width: 100vw;
	height: 100vh;
	top:0;
	left: 0;		
	background : rgba(0,0,0,0.4);
	display: flex;
	justify-content: center;
	align-items: center;

		
	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		
	
	
	}

	@media only screen and (min-width: 768px) {
	
		
	
	}

	@media only screen and (min-width: 992px) {
	
		
	}

`

export const Span = styled.span`


	position: ${
			({  position	}) =>
					position
	};
	top:0;		
	left: 10px;
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
	width: 90%;
	border-radius: 10px;
	padding: 30px;


		
	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		
		width: 50%;
		max-width: 400px;	
	
	}

	
	
	@media only screen and (min-width: 768px) {
	
		width: 60%;
		max-width: 400px;	
	
	}

	@media only screen and (min-width: 992px) {
		width: 50%;
		max-width: 500px;		
	}

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


	
	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		

	
	}


	@media only screen and (min-width: 768px) {
	
		font-size: 23px;
	
	}

	@media only screen and (min-width: 992px) {
		font-size: 25px;
	}
`

export const FormH1 = styled.h1`

	margin-bottom: 20px;
	@media only screen and (min-width: 550px) {
	
		font-size: 30px;
	
	}

	@media only screen and (min-width: 992px) {
		font-size: 35px;
	}	
	
`

