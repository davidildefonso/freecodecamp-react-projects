import React from 'react'

const History = ({items}) => {
	return (
		<div>
			<h3>HISTORY</h3>
			<div>
				<div>
					<div>ID</div>
					<div>ITEM</div>
				</div>
				
				<div>
					{items && items.map(item => 				
						<div 
							key={item.id}>
							{item.id} {item.text}							
						</div>							
					)}
				</div>
					
			</div>
		</div>
	)
} 

export default History
