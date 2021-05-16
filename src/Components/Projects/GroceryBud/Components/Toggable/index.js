import React, { useState } from 'react'

const Togglable = React.forwardRef((props, ref) => {

	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => setVisible(!visible)

	const hideWhenVisible = {
		display: visible ? "none" : "block"
	}

	const showWhenVisible = {
		display: visible ? "block" : "none"
	}

	return (
		<div>
			<div style={hideWhenVisible}>
				<button onClick={toggleVisibility}>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible} className="togglableContent">
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		</div>
	)
})
export default Togglable
