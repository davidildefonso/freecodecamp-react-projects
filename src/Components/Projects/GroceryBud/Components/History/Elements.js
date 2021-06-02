import styled from "styled-components";

export const Container = styled.div`
	width:100%;
	display: flex;
	justify-content: center;
	padding-top: 40px;



		
	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		
	
	
	}



	
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

		width: 95%;
	flex-direction: column;
	background: rgba(0,0,0,0.1);
		height: fit-content;
	padding-top: 20px;

	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
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
		max-width: 500px;
	
	
	}

	
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

	font-size: min(30px, 15vw);
	margin-bottom: 20px;
		text-align: center;



		
	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		font-size: 35px;
		text-align: center;
	
	
	}

		
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
	font-size: 40px;	
	right: 20%;
	top: 15px;

			
	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		font-size: 45px;	
		right: 30%;
		top: 10px;
	
	}


	

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
	word-wrap: break-word;
	padding-left: 50px;
		padding-right: 50px;

	@media only screen and (min-width: 340px) {
	
		
	
	}

	@media only screen and (min-width: 600px) {
		padding-left: 100px;
		padding-right: 100px;
	}



	@media only screen and (min-width: 768px) {	
		padding-left: 100px;
		padding-right: 100px;
	}
	

	@media only screen and (min-width: 992px) {
		padding-left: 20px;
		padding-right: 20px;
	}


`

export const  ItemsLi = styled.li`
	margin-bottom: 15px;	

	@media only screen and (min-width: 340px) {
		font-size: min(25vw, 20px);
		margin-bottom: 15px;	
		
	
	}

	@media only screen and (min-width: 600px) {
		font-size: min(25vw, 20px);
		margin-bottom: 15px;	
	}



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
		
	}


`