import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import  {Card}  from "../card/card.js"
import { Paginado } from "../paginado/paginado.js"
import {filtro} from "../../redux/actions.js"
import { useState } from "react"
import { useEffect } from "react"
import { getTempers } from "../../redux/actions.js"
import style from './home.module.css'

export const Home = ()=>{
    
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getTempers())
    },[dispatch])
    
    const tempersDb = useSelector((state)=> state.allTempers)
    const tempers = tempersDb.map((e)=>{
        return e.name.trim()
    })
    const tempersSelect = tempers.sort()
    
    const dogs = useSelector(state=> state.DOGS)
    
    const [filter, setFilter] = useState({
        origin:'',
        temperament:[],
        az:'',
        za:'',
        weightmin:'',
        weightmax:''
    })

    const [dogsFiltered, setDogsFiltered] = useState(
        dogs
    )

     function onClick (e){
         dispatch(filtro(dogs))
     }

    function handleCheck (e){
        setFilter({...filter,
        [e.target.value]: (e.target.checked)}
        )
        console.log(e.target)
    }
    function handleOrigin (e) {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }
    function handleSelect (e) {
        setFilter({
            ...filter,
            'temperament': Array.from(new Set([...filter.temperament,e.target.value]))
        })
    }
    useEffect(()=>{
        let doguis=dogs
        if(filter.origin === 'db') {            
            doguis = dogs.filter((e)=>{return e.origin === 'db'})
        } else if (filter.origin === 'api') {
            doguis = dogs.filter((e)=>{return e.origin === 'api'})
        } else if (filter.origin === 'all') {
            doguis = dogs
        } else { doguis = dogs}
        if(filter.az === true){
           const names = doguis.map(el => el.name)
           const sorted = names.sort()
           const ordered = sorted.map((e)=> doguis.find(el=> el.name == e))
           doguis = ordered
        } else if (filter.za === true){
           let names = doguis.map(el => el.name) 
           const sorted = names.sort().reverse()
           const ordered = sorted.map((e)=> doguis.find(el=> el.name == e))
           doguis = ordered
        } 

        setDogsFiltered(doguis)
        dispatch(dogsFiltered)
    },[filter])
    console.log(dogsFiltered.length,'este es el filtro')
    return(
        <>
        <h1>Este es el home</h1>
        <NavLink to='/'>
            <button>Landing</button>
        </NavLink>
        <NavLink to='/create'>
            <button>Create Breed</button>
        </NavLink>
        <select name='origin'
                value={filter.origin} 
                onChange={(e)=>handleOrigin(e)}>
                    <option value={'all'}>All Dogs</option>
                    <option value={'db'}>DataBase</option> 
                    <option value={'api'}>Api</option>
                
        </select>
        <select name='temperament'
                value={filter.temperament} 
                onChange={(e)=>handleSelect(e)}>
                    {tempersSelect.map(element => {
                        return(
                        <option value={element}>{element}</option> 
                    )
                })} 
                
            </select>
        <button value='filtro'  onClick={onClick}>Filtro</button>
        {/* <label><input type='checkbox' 
        value='filtro' 
        onChange={handleCheck}/>check</label>
        <label><input type='checkbox' 
        value='filtrob' 
        onChange={handleCheck}/>checkb</label>
        
        {filter.filtro && <h1>algo de los filtros</h1>} */}
        <div className={style.page}>
            <Paginado/>
        </div>
        </>
    )
}