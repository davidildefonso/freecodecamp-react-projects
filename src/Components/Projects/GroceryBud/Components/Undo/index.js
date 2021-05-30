import React, {useState, useEffect}  from 'react'
import {FaUndoAlt} from 'react-icons/fa'
import Button from '../Button'
import { Container } from './Elements'
import {getScrollPos, getWindowHeight} from '../../Utils/Functions'

const UndoIcon = ({showUndo, restoreLastItemFromHistory, notificationTop}) => {

	const [top, setTop] = useState(getScrollPos()  + 250)

	useEffect(() => {
		setTop(getScrollPos() + 250 )
		return () => {
			
		}
	}, [notificationTop])



	return (
		<Container
			top = {top}
			show = {showUndo}
		>
			{showUndo &&
				
					<Button
						handleClick = {restoreLastItemFromHistory}
						text= "Undo"
						type = "Undo"
					>
						<FaUndoAlt></FaUndoAlt>
					</Button>
			
	
			
			}  
		</Container>
	)
}

export default UndoIcon
