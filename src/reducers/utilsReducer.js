const initialState = {
	loaders: "invisible",
	message: "",
}

export default function utilsReducer(state = initialState, action) {
	switch(action.type) {
		case "START_LOADING": 
			return {
				...state,
				loaders: "visible",
				message: action.payload
			}

		case "STOP_LOADING": 
			return {
				...state,
				loaders: "invisible",
				message: ""
			}
			
		default: return state;
	}
}