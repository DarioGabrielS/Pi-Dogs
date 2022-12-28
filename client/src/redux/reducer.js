import { GET_DOGS, ERROR, GET_TEMPERAMENTS, FILTRO } from "./actions"

const initialState={
  DOGS: [],
  allDogs : [],
  allTempers : [],
}

function rootReducer (state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
          return{
            ...state,
            allDogs: action.payload,
            DOGS: action.payload
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
        case FILTRO:
          return{
            ...state,
            allDogs: action.payload
          }
        default:

            return { ...state}
            
    }

}

export default  rootReducer