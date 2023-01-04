import { GET_DOGS, ERROR, GET_TEMPERAMENTS, FILTRO, SEARCHBYNAME, CLEARSEARCHBYNAME, GET_DOG_PARAMS, CLEAR_DETAIL, ORIGIN, ORDER, FILTER_TEMPER, FILTERED_DOGS } from "./actions"

const initialState={
  DOGS: [],
  allDogs : [],
  allTempers : [],
  filterOn: true,
  searchByName: false,
  searchedDogs: [],
  detail:[],
  origin:'all',
  order:'az',
  temperaments:[],
  error:'',
  
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
          case FILTRO:
            return{
              ...state,
              allDogs: action.payload
            }
        case FILTERED_DOGS:
          return{
            ...state,
            allDogs: action.payload,
            filterOn: !state.filterOn
          }
        case SEARCHBYNAME:
            return{
              ...state,
              searchedDogs: action.payload,
          
              searchByName: true
            }
        case CLEARSEARCHBYNAME:
            return{
              ...state,
              searchByName: false,
              searchedDogs:[],
            
            }
        case GET_DOG_PARAMS:
          return {
            ...state,
            detail: action.payload
          
          }
        case CLEAR_DETAIL:
          return{
            ...state,
            detail: action.payload
          }
        case ORIGIN:
          return{
            ...state,
            origin: action.payload
          }
        case ORDER:
          return{
            ...state,
            order: action.payload
          }
        case FILTER_TEMPER:
          return{
            ...state,
            temperaments: action.payload
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