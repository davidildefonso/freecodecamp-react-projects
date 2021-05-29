import styled from "styled-components";

export const Container = styled.div`
	

	display: ${
			({  showHistory	}) =>
					showHistory
						? "block"
						: "none"
	};
	
	@media only screen and (min-width: 768px) {	
		display: ${
			({  showHistory	}) =>
					showHistory
						? "block"
						: "none" 
		};
	}
	

	@media only screen and (min-width: 992px) {
		width: 40%;
		display: block;

	
	}

	

`