export const getItemsFromLocalStorage = (field= "items") => {	
		if(localStorage.getItem(field))	return JSON.parse(localStorage.getItem(field))
		else return []		
} 

export const saveItemsToLocalStorage = (items, field = "items") => {
	localStorage.setItem(field, JSON.stringify(items))
}


export const getScrollPos = () => window.pageYOffset 

export const getWindowWidth = () => window.innerWidth

export const getWindowHeight = () => window.innerHeight


export const  insertItemAtPosition = (list, newItem, position) => {
		const items1 = list.slice(0,position)
		const items2 = list.slice(position,)
		return  items1.concat(newItem).concat(items2)		
}