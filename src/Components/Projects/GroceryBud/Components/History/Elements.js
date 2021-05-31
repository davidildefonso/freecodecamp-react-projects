import styled from "styled-components";

export const Container = styled.div`
	width:100%;
	display: flex;
	justify-content: center;
	padding-top: 40px;


	
	@media only screen and (min-width: 768px) {	
		width: 100%;	
		padding: 40px 0;
	
	}
	

	@media only screen and (min-width: 992px) {
		width:30%;			
		padding: 40px 0;
	}

`

export const BagWrap = styled.div`


	position: relative;
	border-radius: 15px;
	display: ${
			({  showHistory	}) =>
					showHistory
						? "flex"
						: "none"
	};


	flex-direction: column;
	
	@media only screen and (min-width: 768px) {	
		display: ${
			({  showHistory	}) =>
					showHistory
						? "flex"
						: "none" 
		};
		width: 85%;
		height: fit-content;
		background: rgba(0,0,0,0.1);
		padding-top: 20px;
		max-width: 600px;
	}
	

	@media only screen and (min-width: 992px) {
		width: 85%;
		height: fit-content;
		display: flex;
		background: rgba(0,0,0,0.1);
		padding-top: 20px;
	}


`

export const Title = styled.h3`

	font-size: min(35px, 15vw);
	margin-bottom: 20px;


		
	@media only screen and (min-width: 768px) {	
		font-size: 40px;
		text-align: center;
		margin-bottom: 30px;
	}
	

	@media only screen and (min-width: 992px) {
		font-size:45px;
		text-align: center;
		margin-bottom: 50px;
	}







`




export const IconWrap = styled.div`

	font-weight: 100;	
	position: absolute;
	

	@media only screen and (min-width: 768px) {	
		font-size: 55px;
		right: 30%;
		top: 10px;
	}
	

	@media only screen and (min-width: 992px) {
	
			font-size: min(10vh, 55px);
			right: 20px;
			top: 15px;
	
	}






`

export const ItemsWrap = styled.div`
	padding-left: 20px;

	@media only screen and (min-width: 768px) {	
		padding-left: 100px;
	}
	

	@media only screen and (min-width: 992px) {
		padding-left: 20px;
	}


`

export const  ItemsLi = styled.li`


	@media only screen and (min-width: 768px) {	
		font-size: min(25vw, 23px);
		margin-bottom: 15px;	
		word-wrap: break-word;
	}
	

	@media only screen and (min-width: 992px) {
		font-size: min(25vw, 25px);
		margin-bottom: 15px;
	
		word-wrap: break-word;
	}

`

export const ItemsUl = styled.ul`
	
	@media only screen and (min-width: 768px) {	
		padding-bottom: 20px;
	}
	

	@media only screen and (min-width: 992px) {
		padding: 20px;
	}

`

export const ButtonWrap = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 20px 0;


	@media only screen and (min-width: 768px) {	

	}
	

	@media only screen and (min-width: 992px) {
		justify-content: flex-end;
	}


`