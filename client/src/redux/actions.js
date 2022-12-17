import axios from 'axios';
export const GET_DOGS = "GET_DOGS"
export const ERROR = "ERROR"
export const GET_USERS = "GET_USERS"
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const getDogs = () =>{
    return async function (dispatch) {
        try {
            const info = await axios.get('http://localhost:3001/breeds')
            const dogs = info.data
//            console.log(dogs)
        dispatch({
                type: GET_DOGS,
                payload: dogs
            })
        } catch (error) {
        dispatch({
                type: ERROR,
                payload: error
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
        payload: error
      })
    }
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