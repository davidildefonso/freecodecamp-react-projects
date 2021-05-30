import styled, { keyframes } from "styled-components";


export const Container = styled.div`


	position: relative;
	width: 100%;
	text-align: left;

	
	
	
@keyframes appear{
	0%{
		transform: translateY(-100%);
	}

	5%{
		transform: translateY(0%);
	}

	95%{
		transform: translateY(0%);
	}

	100%{
		transform: translateY(-100%);
	}
}

`


export const Content = styled.h3`

	margin: 0;
	padding: 0;
	position: absolute;
	left: 0;
	top: 0;


`