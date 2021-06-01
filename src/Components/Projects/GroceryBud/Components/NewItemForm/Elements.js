import styled from "styled-components";

export const Form = styled.form`
	width: 90%;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
	
	width: 100%;
`

export const Input = styled.input`

	font-size: min(10vw, 20px);	
	padding: 15px 5px;
	width: 100%;
	border-radius: 5px;

	&:focus{
		outline: none;
	}


	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		
		font-size:  20px;
		padding: 15px 5px;
		width: 80%;
	
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