import styled from "styled-components";

export const SingleItem = styled.div`
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	font-size: min(10vw, 20px);
	width: 95%;
	background: rgba(0,0,0,0.1);
	border-radius: 5px;
	padding: 20px 0px 20px 20px;
	border: 1px transparent solid;

	&:hover{
		border: 1px rgba(0,0,0,0.3) solid;
		cursor: pointer;
	}

	@media only screen and (min-width: 420px) {

		
		width: 80%;
		max-width: 600px;
	
	}

	@media only screen and (min-width: 768px) {
	
		min-width: 500px;
		width: 80%;
		max-width: 600px;
		
	}

	@media only screen and (min-width: 992px) {
	
		max-width: 600px;
		width: 80%;
	
	}



`
export const ItemText = styled.div`
	width: 60%; 
	max-width: 60%;
	word-wrap: break-word;
	display: flex;
	align-items: center;
	

	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		
		font-size:  22px;
	
	}



	@media only screen and (min-width: 768px) {
	
		font-size: 22px;
	
	}

	@media only screen and (min-width: 992px) {
	
		font-size: 25px;
	}



` 

export const Container = styled.div`
	width: 100%; 
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

` 

export const Input = styled.input`

	padding: 5px;
		font-size:  20px;
		width: 100%;

	&:focus{
		outline: none;
		border:none;
		background: #fff;
		border-radius: 5px;
	}


	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		
		font-size:  20px;
		width: 100%;
	}


	@media only screen and (min-width: 768px) {
	
		font-size: 22px;
		width: 100%;
	}

	@media only screen and (min-width: 992px) {
		font-size: 24px;
		width: 100%;
	}

`

export const ButtonsContainer = styled.div`

	display: flex;
	flex-direction: row;
	align-items: center;
	
	justify-content: center;

	@media only screen and (min-width: 550px) {
		
			margin-top: 0px;
	
	}

	@media only screen and (min-width: 992px) {
	
	
	}

`