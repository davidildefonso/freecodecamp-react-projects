import styled, { keyframes } from "styled-components";


export const Container = styled.div`


	background: #000;
	margin-bottom: 20px;
	color: #f0f0f0;
	padding: 18px 16px;
	transition: all 0.2s ease-in-out;
	font-size: 20px;
	border-radius: 0 10px 10px 0px;
	position: absolute;
	left: 0;

	top: ${
			({ top	}) =>
					top+"px" 
	};


	transform: ${
			({ show	}) =>
					show ? `translateX(0%)` : `translateX(-200%)`
	};

	opacity: ${
			({ show	}) =>
					show ? "1" : "0"
	};

`


export const Content = styled.h3`

	


`