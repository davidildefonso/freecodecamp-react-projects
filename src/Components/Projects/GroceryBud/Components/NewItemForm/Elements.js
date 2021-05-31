import styled from "styled-components";

export const Form = styled.form`

	display: flex;
`

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
`

export const Input = styled.input`

	font-size: min(10vw, 25px);
	padding: 5px;
	border-radius: 5px;

	&:focus{
		outline: none;
	}

	
	@media only screen and (min-width: 768px) {
	
		width: 60%;
		min-width: 450px;
	
	}

	@media only screen and (min-width: 992px) {	
		
		width: 70%;
		min-width: 500px;
				
	}






`