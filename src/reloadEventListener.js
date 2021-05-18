
//for test only, page refreshes by pressing the F5 button


const AddEventReloadToWindow = (() => {
	window.addEventListener("keydown", (e) => {
		if(e.key === "F5"){
		console.log(e.keyCode)
				e.preventDefault()
				window.location.reload() 
		}

	})
})()

export default AddEventReloadToWindow

// 