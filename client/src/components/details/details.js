
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
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


{if (Object.keys(dog).length<1 && error.length<=0){
            return(
                <div className={style.loading}>
                    <Loading/>
                
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
        
        <div className={style.container}>
            <section>
            
            <h2>{dog[0].name}</h2>
            <h4>Temperament: {dog[0].temperament}</h4>
            <h4>Weight: {dog[0].weight}</h4>
            <h4>Height: {dog[0].height}</h4>
            <h4>Life span: {dog[0].life_span}</h4>
            </section>
            <div>
            <img src={dog[0].img} alt='Not found'/>
            </div>
        </div>
        
        </>

            )
        }}
    

    
}
