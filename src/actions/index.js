export const startLoading = (message) => {
	return {
		type: "START_LOADING",
		payload: message
	}
}
export const stopLoading = () => {
	return {
		type: "STOP_LOADING"
	}
}