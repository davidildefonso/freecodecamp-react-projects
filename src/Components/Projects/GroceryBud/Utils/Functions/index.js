export const getItemsFromLocalStorage = (field= "items") => {	
		if(localStorage.getItem(field))	return JSON.parse(localStorage.getItem(field))
		else return []		
} 

export const saveItemsToLocalStorage = (items, field = "items") => {
	localStorage.setItem(field, JSON.stringify(items))
}