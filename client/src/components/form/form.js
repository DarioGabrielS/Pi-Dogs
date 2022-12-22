import { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { getTempers } from "../../redux/actions"
import axios from 'axios'

export const Form = ()=>{
    
const dispatch = useDispatch()


useEffect(()=>{
    dispatch(getTempers())
},[dispatch])

const tempersDb = useSelector((state)=> state.allTempers)
const tempers = tempersDb.map((e)=>{
    return e.name.trim()
})
const tempersSelect = tempers.sort()

const [dog, setDog] = useState({
    name: '',
    weight: '',
    height: '',
    temperament:[],
    life_span: '',
    img:''
})

const [errorButton, setErrorButton] = useState(true)

const [errorForm, setErrorForm] = useState({
    name: '',
    weight: '',
    height: '',
    temperament:'',
    life_span: '',
    img:''
})



const handleChange = (e) =>{

 setDog ( {
    ...dog,
    [e.target.name] : e.target.value })
 setErrorForm(validate(dog))

 }
 const handleSelect = (e)=>{
    setDog ({
        ...dog,
        'temperament' : Array.from(new Set([...dog.temperament,e.target.value]))
    })
 }
const handleError = (e) =>{
    

}
const handleSubmit = async (e)=>{
    e.preventDefault()
    setErrorForm(validate(dog)) 
    await axios.post('http://localhost:3001/breeds',dog)
}

const validate = (dog)=> {
    const errors = {}
   if(dog.name.length < 1) errors.name= ('Must enter a name')
   if(dog.weight.length < 1) errors.weight= ( 'Must enter a weight' )


   return errors
}

useEffect(()=>{
    setErrorForm(validate(dog))
},[dog])
useEffect(()=>{
    if(Object.values(errorForm).length<1){
        setErrorButton(false)
    }else{
        setErrorButton(true)
    }
},[errorForm])
console.log(dog)
console.log(errorForm)
    return(
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <div><h3>Crete you own Breed</h3></div>
            <label >Name:  </label>
            <input 
                name='name' 
                value={dog.name}
                type= 'text' 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter a name' /> 
                {errorForm.name? (<h6><small>{errorForm.name}</small></h6>) : false}
            </div>
            <div>
            <label >Weight:  </label>
            <input 
                name='weight' 
                value={dog.weight} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter the weight' />
                {errorForm.weight? (<h5><small>{errorForm.weight}</small></h5>) : false} 
            </div>
            <div>
            <label >Height:  </label>
            <input 
                name='height' 
                value={dog.height} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter the height' />
                {errorForm.height? (<h5><small>{errorForm.height}</small></h5>) : false}
            </div>
            <div>
            <label >Temperament:  </label>
                          
            <select name='temperament'
                value={dog.temperament} 
                onChange={(e)=>handleSelect(e)}>
                    {tempersSelect.map(element => {
                        return(
                        <option value={element}>{element}</option> 
                    )
                })} 
                
            </select>
            {errorForm.temperament? (<h5><small>{errorForm.temperament}</small></h5>) : false}
            </div>
            <div>
            <label >Life Span:  </label>
            <input 
                name='life_span' 
                value={dog.life_span} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Enter the Life Span' />
                {errorForm.life_span? (<h5><small>{errorForm.life_span}</small></h5>) : false}
            </div>
            <div>
            <label >Image:  </label>
            <input 
                name='img' 
                value={dog.img} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Image URL' />
                {errorForm.img? (<h5><small>{errorForm.img}</small></h5>) : false}
            </div>
            <br></br>
            <button type='submit' 
                disabled={errorButton} 
                onSubmit={(e)=>handleSubmit(e)}>CREATE!</button>
               
        </form>
        
        </>
    )
}
