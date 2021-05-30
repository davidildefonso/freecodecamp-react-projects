import styled from "styled-components";

export const SingleItem = styled.div`
	margin-bottom: 20px;
	display: flex;
	justify-content: space-around;
	font-size: min(10vw, 20px);
	width: 80%;
	background: rgba(0,0,0,0.1);
	border-radius: 5px;
	padding: 20px 0px 20px 20px;
	border: 1px transparent solid;

	&:hover{
		border: 1px rgba(0,0,0,0.3) solid;
		cursor: pointer;
	}


`
export const ItemText = styled.div`
	width: 60%; 
	max-width: 60%;
	word-wrap: break-word;
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
	font-size: min(10vw, 20px);

	&:focus{
		outline: none;
		border:none;
		background: #fff;
		border-radius: 5px;
	}

`