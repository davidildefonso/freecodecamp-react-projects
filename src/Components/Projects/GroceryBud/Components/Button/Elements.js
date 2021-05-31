import styled from 'styled-components'

export const ButtonWrapper = styled.button`

	width: fit-content;

	background: ${
			({  type	}) =>
					type === "Modal"
						? "#000" : "transparent"
	};

	padding: ${
			({  type	}) =>
					type === "Modal"
						? "5px" : "5px"
	};

	border-radius: ${
			({  type	}) =>
					type === "Modal"
						&& "5px"
	};

	margin: ${
			({  type	}) =>
					type === "Modal"
						&& "0px 15px"
	};

	color: ${
			({  type	}) =>
					type === "Modal"
						&& "#fff"
	};
	
	border: 2px solid transparent;
	display: flex;	
	font-size: min(12vw, 25px);
	align-items: center;

	&:focus{
		outline: none;
	}

	&:hover{
		cursor: pointer;
		background: ${
			({  type	}) =>
					type === "Modal"
					 && "#fff"
		} ;


		color: ${
			({  type	}) =>
					type === "Undo"
						? "#fff" 
						: type === "Modal" 
								? "#000"
								: "#00a"
		}; 


		border: ${
			({  type	}) =>
					type === "Modal"
					 && "2px solid #000"
					 
		} ;
	}


	&:active{
		cursor: pointer;
		background: ${
			({  type	}) =>
					type === "Modal"
					 && "#000"
		} ;


		color: ${
			({  type	}) =>
					type === "Undo"
						? "#fff" 
						: type === "Modal" 
								? "#fff"
								: "#00a"
		}; 


		border: ${
			({  type	}) =>
					type === "Modal"
					 && "2px solid transparent"
					 
		} ;
	}




	@media only screen and (min-width: 768px) {
		font-size: min(12vw, 20px);
		
	
	}

	@media only screen and (min-width: 992px) {
			font-size: min(12vw, 20px);

	
	}



`
export const Icon = styled.i`

	display: flex;
	font-size: ${
			({  type	}) =>
					type === "add"
						? "min(30vw, 50px)" : "min(18vw, 30px)"
	};

	&:hover{
		cursor: pointer;
		color: ${
			({  type	}) =>
					type === "Undo"
						? "#fff" : "#00a"
		}
	}

	&:active{		
		color: ${
			({  type	}) =>
					type === "Undo"
						&&  "#00a"
		}
	}
	
	

`

export const Text = styled.span`

	color: ${
			({  type	}) =>
					type === "Modal"
					 && "inherit" 
	};

	font-size: ${
			({  type	}) =>
					type === "Modal"
					 && "25px" 
	};
	

	display: ${
			({  type	}) =>
					type === "Modal"
						? "block" : "none"
	};



	@media only screen and (min-width: 768px) {
		display: block;	 
		font-size: ${
			({  type	}) =>
					type === "Modal"
					 && "22px" 
		};
	
	}

	&:hover{
		color: ${
			({  type	}) =>
					type === "Modal"
					 && "inherit" 
	};
	}

	@media only screen and (min-width: 992px) {
		font-size: ${
			({  type	}) =>
					type === "Modal"
					 && "25px" 
		};
	}

`