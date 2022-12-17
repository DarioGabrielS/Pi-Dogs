import { GET_DOGS, ERROR, GET_TEMPERAMENTS } from "./actions"

const initialState={
  allDogs : [],
  allTempers : [],
}

function rootReducer (state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
          return{
            ...state,
            allDogs: action.payload
          }
        case GET_TEMPERAMENTS:
          return{
            ...state,
            allTempers: action.payload
          }    
        case ERROR:
                return{
                    ...state,
                    error: action.payload
                }
        default:

            return { ...state}
            
    }

}

export default  rootReducer