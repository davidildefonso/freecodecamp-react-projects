import styled from "styled-components";

export const Container = styled.div`
	display: block;
	font-size: min(10vw, 25px);


	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		
		font-size:  25px;
	
	}



	@media only screen and (min-width: 768px) {
	

	
	}

	@media only screen and (min-width: 992px) {
	
		display: none;
	
	}

`


export const List = styled.span`

	padding-bottom: 5px;
	border-bottom: ${
		({  show	}) =>
				show
					? "2px #000 solid;" : "none"
	};


	&:hover{
		cursor: pointer;
		
		color: #008;
		border-bottom: 2px #008 solid;
	}




`

export const History = styled.span`

	padding-bottom: 5px;
	border-bottom: ${
		({  show	}) =>
				show
					? "2px #000 solid;" : "none"
	};

	&:hover{
		cursor: pointer;
		color: #008;
		border-bottom: 2px #008 solid;
		
		
	}


	transition: color ease-in-out 0.2s;
`

export const Pipe = styled.span`
	margin: 0 10px;
	padding-bottom: 5px;

`