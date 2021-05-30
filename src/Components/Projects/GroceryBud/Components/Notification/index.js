import React, {useState, useEffect} from 'react'
import { Content, Container } from './Elements'
import { getWindowWidth, getWindowHeight, getScrollPos } from '../../Utils/Functions'

const Notification = ({show, notification, notificationTop}) => {

	const [width, setWidth] = useState(getWindowWidth())
	const [top, setTop] = useState(getScrollPos() + getWindowHeight()/5)


	useEffect(() => {
		setWidth(getWindowWidth())
		setTop(getScrollPos() + getWindowHeight()/5)
		return () => {
			
		}
	}, [show])

	useEffect(() => {
		setTop(notificationTop)
		return () => {
			
		}
	}, [notificationTop])


	return (

		<Container show={show} top={top} >
				<Content>{notification}</Content>  
		</Container>
	
	)
}

export default Notification
