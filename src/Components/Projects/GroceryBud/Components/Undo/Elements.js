import styled from "styled-components";

export const Container = styled.div`

	position: absolute;
	top: ${
			({ top	}) =>
					top+"px" 
	};
	left: 0;
	background: #fff;
	padding: 10px;
	border-radius: 0 10px 10px 0;
	border: 2px #000 solid;

	transform: ${
			({ show	}) =>
					show ? `translateX(0%)` : `translateX(-200%)`
	};

	opacity: ${
			({ show	}) =>
					show ? "1" : "0"
	};

	transition: all 0.2s ease-in-out;


	&:focus{
		outline: none;
	}

	&:hover{
		cursor: pointer;
		color: #fff;
		background: #000;
	}


`