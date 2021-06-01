import styled from "styled-components";

export const Container = styled.div`
	/* width: 100vw;	 */
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding:  0;
	margin: 0;
	overflow: hidden;
	padding-top:30px;

	@media only screen and (min-width: 420px) {
	
	
	
	
	}

	@media only screen and (min-width: 600px) {
		
		padding-top:30px;
	
	}


	@media only screen and (min-width: 768px) {
	
		
	
	}

	@media only screen and (min-width: 992px) {
	
		
	
	}


`

export const Title = styled.h1`

	display: inline;
	vertical-align: middle;
	font-size: min(15vw,35px);
	margin: 0;

	@media only screen and (min-width: 420px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		
		font-size: 40px;
	
	}


	@media only screen and (min-width: 768px) {
	
		
		font-size: 60px;
	}

	@media only screen and (min-width: 992px) {
		font-size: 70px;
		
	
	}

`

export const Span = styled.span`
	white-space: nowrap;
	

`

export const Icon = styled.span`
	font-size: 60px;
	vertical-align: middle;

	@media only screen and (min-width: 768px) {
	
		
		font-size: 80px;
	}

	@media only screen and (min-width: 992px) {
		font-size: 100px;
		
	
	}


`