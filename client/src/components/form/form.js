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
    minweight: '',
    maxweight: '',
    minheight: '',
    maxheight: '',
    temperament:[],
    life_span: '',
    img:''
})

const [errorButton, setErrorButton] = useState(true)

const [errorForm, setErrorForm] = useState({
    name: '',
    minweight: '',
    maxweight: '',
    minheight: '',
    maxheight: '',
    temperament:'',
    life_span: '',
    img:''
})
const dogSend = {
    name: dog.name,
    weight: dog.minweight+'-'+dog.maxweight,
    height: dog.minheight+'-'+dog.maxheight,
    temperament: dog.temperament,
    life_span: dog.life_span+' years',
    img: dog.img
}

console.log(dogSend)
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

const handleSubmit = async (e)=>{
    e.preventDefault()
    setErrorForm(validate(dog)) 
    await axios.post('http://localhost:3001/breeds',dogSend)
}

const validate = (dog)=> {
    const errors = {}
    
    if(dog.name.length < 1) errors.name= ('Must enter a name')
    if(dog.name.trim().length < 1) errors.name = ('Name cant be just spaces')
    if( !/^[A-Za-z\s]*$/.test(dog.name)) errors.name='Valid name only includes letters and spaces'
    
    if(dog.minweight.length < 1) errors.minweight= ( 'Minimum weight must be just numbers, 2 digits' )
    if(dog.minweight <1) errors.minweight='Weight must be greater than 0'
    if(!/^\d{1}\d?$/.test(dog.minweight)) errors.minweight='One or two digits number, no letters'
    
    if(dog.maxweight<=dog.minweight) errors.maxweight='Maximum cant be smaller than minimum'
    if(!/^\d{1}\d?$/.test(dog.maxweight)) errors.maxweight='One or two digits number, no letters'
    
    if(!/^\d{1}\d?$/.test(dog.minheight)) errors.minheight='One or two digits number, no letters'
    if(dog.minheight.length < 1) errors.minheight= ( 'Minimum weight must be just numbers, 2 digits' )
    if(dog.minheight <1) errors.minheight='Weight must be greater than 0'

    if(!/^\d{1}\d?$/.test(dog.maxheight)) errors.maxheight='One or two digits number, no letters'
    if(dog.maxheight<=dog.minheight) errors.maxheight='Maximum cant be smaller than minimum'

    if(!/^\d{2}-?(\d{2})?$/.test(dog.life_span)) errors.life_span='Data must be in XX or XX-XX format'
   
    return errors
}
function handleTempButton (e){
    if(e.target.value === 'undo' && dog.temperament.length>0){
        let temps = dog.temperament
        let pop = dog.temperament.pop()
        
        setDog({
            ...dog,
            temperament: temps}
        )
    }
    if(e.target.value=== 'clear'){
        setDog({
            ...dog,
            temperament:'' }
        )
    }
}
function handleReset (e){
    setDog({
        name: '',
    minweight: '',
    maxweight: '',
    minheight: '',
    maxheight: '',
    temperament:[],
    life_span: '',
    img:''

    })
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
/*console.log(errorForm)*/
    return(
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <div><h3>Create you own Breed</h3></div>
            <label >Name:  </label>
            <input 
                name='name' 
                value={dog.name}
                type= 'text' 
                onChange={(e)=>handleChange(e)} 
                placeholder='Name is required' /> 
                {errorForm.name? (<h6><small>{errorForm.name}</small></h6>) : false}
            </div>
            <div>
            <label >Min. Weight:  </label>
            <input 
                name='minweight' 
                value={dog.minweight} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Minimum weight in kg.' />
                {errorForm.minweight? (<h5><small>{errorForm.minweight}</small></h5>) : false} 
            </div>
            <div>
            <label >Max. Weight:  </label>
            <input 
                name='maxweight' 
                value={dog.maxweight} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Greater than minimum' />
                {errorForm.maxweight? (<h5><small>{errorForm.maxweight}</small></h5>) : false} 
            </div>
            <div>
            <label >Min. Height:  </label>
            <input 
                name='minheight' 
                value={dog.minheight} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Minimum height in cm.' />
                {errorForm.minheight? (<h5><small>{errorForm.minheight}</small></h5>) : false}
            </div>
            <div>
            <label >Max. Height:  </label>
            <input 
                name='maxheight' 
                value={dog.maxheight} 
                onChange={(e)=>handleChange(e)} 
                placeholder='Greater than minimum' />
                {errorForm.maxheight? (<h5><small>{errorForm.maxheight}</small></h5>) : false}
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
            <h4>{dog.temperament}</h4>
            <button type='button' value='undo' onClick={handleTempButton}>Undo Temp assignament</button>
            <button type='button' value='clear' onClick={handleTempButton}>Clear Temps</button>
            </div>
            <br></br>
            <div>
            <label >Life Span:  </label>
            <input 
                name='life_span' 
                value={dog.life_span} 
                onChange={(e)=>handleChange(e)} 
                placeholder='How old they get?' />
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
            <button type='button' 
                 
                onClick={(e)=>handleReset(e)}>RESET</button>
            <button type='submit' 
                disabled={errorButton} 
                onSubmit={(e)=>handleSubmit(e)}>CREATE!</button>
        </form>
            
        </>
    )
}
