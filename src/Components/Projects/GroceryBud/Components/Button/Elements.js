import styled from 'styled-components'

export const ButtonWrapper = styled.button`

	background: transparent;
	border: none;
	display: flex;	
	font-size: min(12vw, 25px);
	align-items: center;

	&:focus{
		outline: none;
	}

	&:hover{
		cursor: pointer;
		color: #00a;
	}





	@media only screen and (min-width: 768px) {
		

	
	}



`
export const Icon = styled.i`

	display: flex;
	font-size: ${
			({  type	}) =>
					type === "add"
						? "min(30vw, 50px)" : "min(18vw, 30px)"
	};


	
	

`

export const Text = styled.span`


	display: none;

	@media only screen and (min-width: 768px) {
		display: block;	 

	
	}



`