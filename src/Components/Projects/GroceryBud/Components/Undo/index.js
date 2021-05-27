import React  from 'react'

const UndoIcon = ({showUndo, restoreLastItemFromHistory}) => {



	return (
		<div>
			{showUndo &&
				<p
					onClick={restoreLastItemFromHistory}
				>undo</p>
			}  
		</div>
	)
}

export default UndoIcon
