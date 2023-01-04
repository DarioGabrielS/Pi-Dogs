import { useDispatch, useSelector } from "react-redux"

import { Paginado } from "../paginado/paginado.js"
import {filtro, filterr, searchByName, clearSearchByName, originGS, orderGS, filtTemp} from "../../redux/actions.js"
import { useState } from "react"
import { useEffect } from "react"
import { getTempers, getDogs } from "../../redux/actions.js"
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

    
    //I get the error from the store and then conditionally render
    const error = useSelector(state=> state.error)
    
    //If dogs werent loaded on lading I send the request here
    const allDogs = useSelector(state=>state.DOGS)    
    if (!allDogs.length)  {dispatch(getDogs())};


    const searchedDogs = useSelector(state=> state.searchedDogs)
    const searchedFlag = useSelector(state => state.searchByName)
    //Create a local state called filter so everytime I change it's content the component re-renders
    const [filter, setFilter] = useState({
        
        origin:'',
        temperament:[],
        order:'az',
        
    })
    // ----------------------------- AQUI VIENE LO NUEVO
    const origin = useSelector(state=> state.origin)
    const order = useSelector(state=>state.order)
    let temperaments = useSelector(state=>state.temperaments)
    let [temp, setTemp] = useState(temperaments)
    // -----------------------------
    useEffect(()=>{
        setTemp(temperaments)
    },[temperaments])

    //OJO ESTA LINEA QUE ESTA DECLARADA PERO PARECE QUE NO HACE NADA
    
    // const [dogsFiltered, setDogsFiltered] = useState(
    //     dogs
    // )
    
    //If the search option was used then ALLDOGS become just the searched dogs, else
    dogs = ''
    if(searchedFlag){
        var dogs = searchedDogs
        
    } else{
        var dogs = allDogs        
    }
        

     function onClick (e){
         dispatch(filtTemp([]))
         
     }

    // function handleCheck (e){
    //     setFilter({...filter,
    //     [e.target.value]: (e.target.checked)}
    //     )
        
    // }

     //---------ESTA HANDLE ES DEL SISTEMA ORIGINAL--------------------------
    // function handleOrigin (e) {
    //     setFilter({
    //         ...filter,
    //         [e.target.name]: e.target.value
    //     })
    // }
     // ------------------------------------------------------
    function handleOrigin (e){
        dispatch(originGS(e.target.value))
    }
    function handleOrder (e){
        dispatch(orderGS(e.target.value))
    }
    
    function handleSelect (e) {
        console.log(temperaments)
        dispatch(filtTemp([...temperaments,[e.target.value]]))
                
    }
//------------------------ESTA ERA LA BUENA----------------
    // function handleSelect (e) {
    //     setFilter({
    //         ...filter,
    //         'temperament': Array.from(new Set([...filter.temperament,e.target.value]))
    //     })
    // }
//----------------------------------------------------------
    useEffect(()=>{
        
        let doguis=dogs
        
        // if(filter.origin === 'db') {    
        if(origin === 'db'){        
            doguis = dogs.filter((e)=>{return e.origin === 'db'})
        // } else if (filter.origin === 'api') {
        } else if(origin=== 'api'){
            doguis = dogs.filter((e)=>{return e.origin === 'api'})
        } else if (filter.origin === 'all') {
            doguis = dogs
        } else { doguis = dogs}
        
        if(temperaments.length>=1){
            const all=[]
           
                doguis.filter((dog) => {
                if( typeof(dog.temperament)=== 'string' && temperaments.every(el=>dog.temperament.includes(el))){
                    all.push(dog)
                }
                    
            })
             doguis = all
            }
            
                        
        
        // if(filter.order === 'az'){
           if(order === 'az'){
           const names = doguis.map(el => (el.name).toLowerCase())
           const sorted = names.sort()
           const ordered = sorted.map((e)=> doguis.find(el=> el.name.toLowerCase() === e))
           doguis = ordered
        // } else if (filter.order === 'za'){
        } else if (order === 'za'){
           let names = doguis.map(el => el.name.toLowerCase()) 
           const sorted = names.sort().reverse()
           const ordered = sorted.map((e)=> doguis.find(el=> el.name.toLowerCase() === e))
           doguis = ordered
        // } else if (filter.order === 'min'){
        } else if (order === 'min'){
           doguis = doguis.sort((a, b) => (parseInt((a.weight.split('-'))[0].trim()) > parseInt((b.weight.split('-'))[0].trim())) ? 1 : -1)
        // } else if (filter.order === 'max'){
        } else if (order === 'max'){
            doguis = doguis.sort((a, b) => (parseInt((a.weight.split('-'))[0].trim()) < parseInt((b.weight.split('-'))[0].trim())) ? 1 : -1)
        }



        // setDogsFiltered(doguis)
        dispatch(filterr(doguis))

    },[searchedFlag, origin, order,temperaments])
    // --------------------- LA DE ABAJO ES LA QUE VA   
    // },[filter,searchedFlag])
    //-----------------------------------------------
    // const filterOn = useSelector(state=> state.filterOn)
    
    const [searchDog, setSearchDog] = useState('')
    function handleSearch (e){
        const aux = e.target.value
        setSearchDog(          
            aux)
    }
    //console.log(searchDog)
    // const handleSearch = (e) =>{

    //     setSearchDog ( {
    //        ...searchDog,
    //        [e.target.name] : e.target.value })
        
       
    // }
    function handleClickSearch (){
        
        dispatch(searchByName(searchDog))
             
    }

    function handleClickClear (){

        dispatch(clearSearchByName())
        setSearchDog('')
    }  
    
    

    if(Object.keys(error).length>0){
        return(
            <>
            <h2>{error.message}</h2>
            </>
        )
    } else {
    
        return(
        <>
        
        <div>
        <input name='search' 
        value={searchDog}
        onChange={handleSearch}/>
        <button type='button' name='search' onClick={handleClickSearch}>Search!</button>
        <button type='button' name='clearsearch' onClick={handleClickClear}>Clear</button>
        </div>
        {/* <NavLink to='/'>
            <button>Landing</button>
        </NavLink>
        <NavLink to='/create'>
            <button>Create Breed</button>
        </NavLink> */}
        <select name='origin'
                value={origin} 
                onChange={(e)=>handleOrigin(e)}>
                    <option value={'all'}>All Dogs</option>
                    {/* <option value={'all'}>All</option> */}
                    <option value={'db'}>DataBase</option> 
                    <option value={'api'}>Api</option>
                
        </select>
        <select name='order'
                value={order} 
                onChange={(e)=>handleOrder(e)}>
                    <option value={'az'}>A to Z</option>
                    <option value={'za'}>Z to A</option> 
                    <option value={'min'}>Min to Max</option>
                    <option value={'max'}>Max to Min</option>                 
        </select>
        
        <select name='temperament'
                value={temperaments} 
                onChange={(e)=>handleSelect(e)}>
                    {tempersSelect.map(element => {
                        return(
                        <option value={element}>{element}</option> 
                    )
                })} 
                
            </select>
        <button value='filtro'  onClick={onClick}>ClearTemp</button>
    

        <section className={style.page}>
           
            <Paginado/>
        </section>
        </>
    )
}
}

