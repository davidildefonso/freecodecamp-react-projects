import styled from "styled-components";

export const Container = styled.div`
	width: 100vw;	
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding:  0;
	margin: 0;
	
	@media only screen and (min-width: 768px) {
	
		
	
	}

	@media only screen and (min-width: 992px) {
		background: blue;
		
	
	}


`

export const Title = styled.h1`

	display: inline;
	vertical-align: middle;

	margin: 0;
	@media only screen and (min-width: 768px) {
	
		
	
	}

	@media only screen and (min-width: 992px) {
		font-size: 70px;
		
	
	}

`

export const Span = styled.span`
	white-space: nowrap;
	

`

export const Icon = styled.span`
	font-size: 100px;
	vertical-align: middle;

`