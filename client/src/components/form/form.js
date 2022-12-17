import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { getTempers } from "../../redux/actions"

export const Form = ()=>{
    
const dispatch = useDispatch()


useEffect(()=>{
    dispatch(getTempers())
},[dispatch])

const tempers = useSelector((state)=> state.allTempers)
console.log(tempers)
const [dog, setDog] = useState({
    name: '',
    weight: '',
    height: '',
    temper:[],
    life_span: '',
    img:''
})

const [errorButton, setErrorButton] = useState(true)

const [errorForm, setErrorForm] = useState('')



const handleChange = (e) =>{
 console.log(e.target.value)
 console.log(e.target.name)
 setDog ( {
    ...dog,
    [e.target.name] : e.target.value })

 }
const handleError = (e) =>{


}
const handleSubmit = (e)=>{

}
 //console.log(dog)
    return(
        <>
        <form>
            <div>
            <label >Name:  </label>
            <input 
                name='name' 
                value={dog.name}
                type= 'text' 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter a name' /> 
            </div>
            <div>
            <label >Weight:  </label>
            <input 
                name='weight' 
                value={dog.weight} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter the weight' /> 
            </div>
            <div>
            <label >Height:  </label>
            <input 
                name='height' 
                value={dog.height} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter the height' /> 
            </div>
            <div>
            <label >Temperament:  </label>
            <input 
                name='temper' 
                value={dog.temper} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter the Temperament' />
            </div>
            <div>
            <label >Life Span:  </label>
            <input 
                name='life_span' 
                value={dog.life_span} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter the Life Span' />
            </div>
            <div>
            <label >Image:  </label>
            <input 
                name='image' 
                value={dog.img} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Image URL' />
            </div>
            <button type='submit' disabled={errorButton} onSubmit={(e)=>handleSubmit(e)}>CREATE!</button>
               
        </form>
        
        </>
    )
}