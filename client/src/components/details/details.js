
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getdogparams } from '../../redux/actions'
import { clearDetail } from '../../redux/actions'
import { Loading } from './loading'

import style from './details.module.css'


export function Details (){

const {id} = useParams()
const dispatch = useDispatch()
const dog = useSelector((state)=> state.detail)
const error = useSelector((state)=> state.error)
useEffect( ()=>{
   dispatch(getdogparams(id))
    
   return ()=>{
     dispatch(clearDetail())
   }
},[dispatch, id]
)

let i =4
{if (Object.keys(dog).length<1 && error.length<=0){
            return(
                <div>
                <Loading/>
                {/* <h1>Loading...</h1> */}
                </div>
            )

        }else if(Object.keys(error).length>0){
            return(
                <>
                <h2>{error.message}</h2>
                </>
            )
        } else {
            return(
        <>
        <div>
            <h3>{id}</h3>
            
            <h3>Name: {dog[0].name}</h3>
            <h4>Temp: {dog[0].temperament}</h4>
            <h4>Weight: {dog[0].weight}</h4>
            <h4>Height: {dog[0].height}</h4>
            <h4>Life span: {dog[0].life_span}</h4>
            <img src={dog[0].img} alt='Not found'/>
        </div>
        </>

            )
        }}
    

    
}
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useParams } from 'react-router-dom'
// import { getDetail } from '../../redux/actions'


// export default function DetailDog() {
//   const { id } = useParams()
//   const dispatch = useDispatch()
//   const dog = useSelector((state) => state.detail)

//   useEffect(() => {
//     dispatch(getDetail(id))
//   }, [id, dispatch])