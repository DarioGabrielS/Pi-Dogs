import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Paginado } from "../paginado/paginado.js"
import {filtro, filterr, searchByName, clearSearchByName, holdFilter} from "../../redux/actions.js"
import { useState } from "react"
import { useEffect } from "react"
import { getTempers, getDogs } from "../../redux/actions.js"
import style from './home.module.css'

export const Home = ()=>{
    
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getTempers())
        // return ()=>{
        //     dispatch(holdFilter(filter))
        //   }
    },[dispatch])

    
    const tempersDb = useSelector((state)=> state.allTempers)
    const tempers = tempersDb.map((e)=>{
        return e.name.trim()
    })
    const tempersSelect = tempers.sort()

    const filterhold= useSelector(state => state.holdFilter)
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
         setFilter({
            ...filter,
            'temperament':[]

         })
     }

    // function handleCheck (e){
    //     setFilter({...filter,
    //     [e.target.value]: (e.target.checked)}
    //     )
        
    // }
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
        
        if(filter.temperament.length>=1){
            const all=[]
           
                doguis.filter((dog) => {
                if( typeof(dog.temperament)=== 'string' && filter.temperament.every(el=>dog.temperament.includes(el))){
                    all.push(dog)
                }
                    
            })
             doguis = all
            }
            
                        
        // if(filter.temperament.length>=1){
        //     const all=[]
        //     //console.log(filter.temperament+' dentro de funcion filtro')
        //     filter.temperament.forEach((temp)=>{
        //     //    console.log(filter.temperament+' dentro del forEach')
        //     //    console.log(temp+' variable del forEach')
	    //         doguis.filter((element) => {
        //     //        console.log(temp+' dentro del filter')
        //      //       console.log(element.temperament)
        //              if( typeof(element.temperament) === 'string' && (element.temperament).includes(temp)){

                        
        //              all.push(element)
        //              }
                          
        //             }
        //         )
      
        //      })
        //     const data= Array.from(new Set(all))
        //     doguis = data
            
        //  } 
        if(filter.order === 'az'){
           const names = doguis.map(el => (el.name).toLowerCase())
           const sorted = names.sort()
           const ordered = sorted.map((e)=> doguis.find(el=> el.name.toLowerCase() === e))
           doguis = ordered
        } else if (filter.order === 'za'){
           let names = doguis.map(el => el.name.toLowerCase()) 
           const sorted = names.sort().reverse()
           const ordered = sorted.map((e)=> doguis.find(el=> el.name.toLowerCase() === e))
           doguis = ordered
        } else if (filter.order === 'min'){
           doguis = doguis.sort((a, b) => (parseInt((a.weight.split('-'))[0].trim()) > parseInt((b.weight.split('-'))[0].trim())) ? 1 : -1)
        } else if (filter.order === 'max'){
            doguis = doguis.sort((a, b) => (parseInt((a.weight.split('-'))[0].trim()) < parseInt((b.weight.split('-'))[0].trim())) ? 1 : -1)
        }



        // setDogsFiltered(doguis)
        dispatch(filterr(doguis))

        
    },[filter,searchedFlag])

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
    
    useEffect(()=>{
        return ()=>{
            let obj = filter
            dispatch(holdFilter(obj))
          }
    },[])

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
                value={filter.origin} 
                onChange={(e)=>handleOrigin(e)}>
                    <option value={'all'}>All Dogs</option>
                    <option value={'db'}>DataBase</option> 
                    <option value={'api'}>Api</option>
                
        </select>
        <select name='order'
                value={filter.order} 
                onChange={(e)=>handleOrigin(e)}>
                    <option value={'az'}>A to Z</option>
                    <option value={'za'}>Z to A</option> 
                    <option value={'min'}>Min to Max</option>
                    <option value={'max'}>Max to Min</option>                 
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
        <button value='filtro'  onClick={onClick}>ClearTemp</button>
    

        <section className={style.page}>
           
            <Paginado/>
        </section>
        </>
    )
}
}

