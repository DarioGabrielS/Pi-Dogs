import axios from 'axios';

export const GET_DOGS = "GET_DOGS"
export const ERROR = "ERROR"
export const GET_USERS = "GET_USERS"
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const FILTRO = 'FILTRO'
export const FILTERR = 'FILTERR'
export const SEARCHBYNAME = 'SEARCHBYNAME'
export const CLEARSEARCHBYNAME = 'CLEARSEARCHBYNAME'
export const GET_DOG_PARAMS = 'GET_DOG_PARAMS'
export const CLEAR_DETAIL = 'CLEAR_DETAIL'
export const FILTER_HOLD = 'FILTER_HOLD'
export const ORIGIN = 'ORIGIN'
export const ORDER = 'ORDER'
export const FILTER_TEMPER = 'FILTER_TEMPER'
export const getDogs = () =>{
    return async function (dispatch) {
        try {
            const info = await axios.get('http://localhost:3001/breeds')
            const dogs = info.data

        dispatch({
                type: GET_DOGS,
                payload: dogs
            })
        } catch (error) {
        dispatch({
                type: ERROR,
                payload:{ 
                  message : error.message}
            })
            
        }
    }
}

export const getTempers = ()=>{
  return async function (dispatch){
    try {
      const info = await axios.get('http://localhost:3001/temperament')
      const tempers = info.data

      dispatch({
        type: GET_TEMPERAMENTS,
        payload: tempers
      })

    } catch (error) {
      dispatch({
        type: ERROR,
        payload:{ 
          message : error.message}
      })
    }
  }
}

export const filterr = (dogs)=>{
  return function (dispatch){
    dispatch({
      type: FILTERR,
      payload: dogs
    })
  }


}
export const searchByName = (id)=>{
  return async function (dispatch){
    try {
      const info = await axios.get(`http://localhost:3001/breeds?name=${id}` )
      const dogs = info.data
      dispatch({
        type:SEARCHBYNAME,
        payload: dogs,
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload:{ 
          message : error.message}
      })
    }
  }
}

export const getdogparams = (id)=>{
  return async function (dispatch){
  try {
    const info = await axios.get(`http://localhost:3001/breeds/${id}` )
    const dog = info.data
    dispatch({
      type:GET_DOG_PARAMS,
      payload:dog
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload:{
        message : error.message}
    })
    
  }
  
}
}
export const clearDetail = ()=>{
  return function (dispatch){
    dispatch({
      type:CLEAR_DETAIL,
      payload:[]
    })
  }
}
export const holdFilter = (obj)=>{
  return function (dispatch){
    dispatch({
      type:FILTER_HOLD,
      payload:{obj}
    })
  }
}
export const clearSearchByName = ()=>{
  return function (dispatch){
    dispatch({
      type:CLEARSEARCHBYNAME,
      payload: false
    })
  }
}

export const filtro = (dogs)=>{
  return function(dispatch){
  //   const filtrado = dogs.filter(e=> e.origin === 'api')
  // dispatch({
  //   type: FILTRO,
  //   payload: filtrado
  // })
  }

}
export const originGS = (value)=>{
  return function (dispatch){
    dispatch({
      type: ORIGIN,
      payload: value
    })
  }
}
export const orderGS = (value)=>{
  return function(dispatch){
    dispatch({
      type:ORDER,
      payload: value
    })
  }
}




 export const filtTemp = (value)=>{
    return function (dispatch){
      dispatch({
          type: FILTER_TEMPER,
          payload: value
      })
    }

 }

export const getUsers = () => {
    return function (dispatch) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch({
            type: GET_USERS,
            payload: data,
          });
        })
        .catch((err) => console.log(err));
    };
  };