import styled from "styled-components";

export const Container = styled.div`
	width: 100%;

	display: ${
			({  showHistory	}) =>
					showHistory
						? "none"
						: "block"
	};
	

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
		width: 60%

	
	}

`


 