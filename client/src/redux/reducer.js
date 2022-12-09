import { GET_DOGS, ERROR } from "./actions"

const initialState={
  allDogs : []
}

function rootReducer (state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
          return{
            ...state,
            allDogs: action.payload
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