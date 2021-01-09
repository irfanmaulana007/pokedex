import { combineReducers } from 'redux'
import utilsReducer from './utilsReducer'

const rootReducer = combineReducers({
    
    utils: utilsReducer,
  
})


export default rootReducer;