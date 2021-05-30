import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	padding: 40px 0;
	display: ${
			({  showHistory	}) =>
					showHistory
						? "none"
						: "flex"
	};
	flex-direction: column;
	justify-content: center;
	align-items: center;
	//position: relative;

	@media only screen and (min-width: 768px) {
		width: 100%;		
		display: ${
				({  showHistory	}) =>
						showHistory
							? "none"
							: "block"
		};
	
	}

	@media only screen and (min-width: 992px) {
		width: 70%;
		display: flex;
		background: green;
		padding: 40px 0;
	}

`


export const Button = styled.button`
	font-size: min(12vw, 20px);
	
	background: #000;
	color: #fff;
	border: none;
	border-radius: 5px;
	padding: 10px;
	margin-top: 30px;

	&:focus{
		outline: none;
	}

	&:hover{
		cursor: pointer;
		background: #fff;
		color:#000;
		border: 1px #000 solid;
	}

	&:active{
		background: #000;
		color:#fff;

	}

	transition: all ease-in-out 0.2s;

`