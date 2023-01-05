import { useDispatch, useSelector } from "react-redux"
import { Error } from "../error/error"
import { Paginado } from "../paginado/paginado.js"
import { filteredDogs, searchByName, clearSearchByName, originGS, orderGS, filtTemp } from "../../redux/actions.js"
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
    
   
    const origin = useSelector(state=> state.origin)
    const order = useSelector(state=>state.order)
    
    let temperaments = useSelector(state=>state.temperaments)
    let [temp, setTemp] = useState(temperaments)
    // -----------------------------
    useEffect(()=>{
        setTemp(temperaments)
    },[temperaments])

        
    //If the search option was used then ALLDOGS become just the searched dogs, else

    var dogs = ''
    if(searchedFlag){
         dogs = searchedDogs
        
    } else{
         dogs = allDogs        
    }
        

    

    useEffect(()=>{
        
        let doguis=dogs
        
        if(origin === 'db'){        
            doguis = dogs.filter((e)=>{return e.origin === 'db'})
        } else if(origin=== 'api'){
            doguis = dogs.filter((e)=>{return e.origin === 'api'})
        } else if (origin === 'all') {
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
            
                        
        if(order === 'az'){
           const names = doguis.map(el => (el.name).toLowerCase())
           const sorted = Array.from(new Set(names.sort()))
           const ordered = sorted.map((e)=> doguis.find(el=> el.name.toLowerCase() === e))
           doguis = ordered
        
        } else if (order === 'za'){
           let names = doguis.map(el => el.name.toLowerCase()) 
           const sorted = Array.from(new Set(names.sort().reverse()))
           const ordered = sorted.map((e)=> doguis.find(el=> el.name.toLowerCase() === e))
           doguis = ordered
        
        } else if (order === 'min'){
           doguis = doguis.sort((a, b) => (parseInt((a.weight.split('-'))[0].trim()) > parseInt((b.weight.split('-'))[0].trim())) ? 1 : -1)
        
        } else if (order === 'max'){
            doguis = doguis.sort((a, b) => (parseInt((a.weight.split('-'))[0].trim()) < parseInt((b.weight.split('-'))[0].trim())) ? 1 : -1)
        }

        dispatch(filteredDogs(doguis))

    },[searchedFlag, origin, order,temperaments])
    
    
    const [searchDog, setSearchDog] = useState('')

    function handleSearch (e){
        setSearchDog(e.target.value)
    }

    function clearTemp (e){
        dispatch(filtTemp([]))
   }

   function handleOrigin (e){
       dispatch(originGS(e.target.value))
   }

   function handleOrder (e){
       dispatch(orderGS(e.target.value))
   }
   
   function handleSelect (e) {
       dispatch(filtTemp([...temperaments,[e.target.value]]))          
   }
    function handleClickSearch (){
        
        dispatch(searchByName(searchDog))             
    }

    function handleClickClear (){

        dispatch(clearSearchByName())
        setSearchDog('')
    }  
    
    //------------- RENDER -----------------------------------

    if(Object.keys(error).length>0){
        return(
            <>
            <Error error/>
            {/* <h1>An error has ocurred</h1>
            <h2>{error.message ? error.message : 'Error'}</h2> */}
            </>
        )
    } else {
    
        return(
        <>
        
        <div className={style.search}>
        <input name='search' 
        placeholder="Search your Dog..."
        value={searchDog}
        onChange={handleSearch}/>
        <button type='button' className={style.button} name='search' onClick={handleClickSearch}>Search!</button>
        <button type='button' className={style.button} name='clearsearch' onClick={handleClickClear}>Clear</button>
        </div>
        
        <select name='origin'
                // multiple
                className={style.select}
                value={origin} 
                onChange={(e)=>handleOrigin(e)}>
                    <option value={'all'}>All Dogs</option>
                    
                    <option value={'db'}>DataBase</option> 
                    <option value={'api'}>Api</option>
                
        </select>
        <select name='order'
                //multiple
                className={style.select}
                value={order} 
                onChange={(e)=>handleOrder(e)}>
                    <option value={'az'}>A to Z</option>
                    <option value={'za'}>Z to A</option> 
                    <option value={'min'}>Min to Max</option>
                    <option value={'max'}>Max to Min</option>                 
        </select>
        
        <select name='temperament'
                //multiple
                className={style.select}
                value={temperaments} 
                onChange={(e)=>handleSelect(e)}>
                    {tempersSelect.map(element => {
                        return(
                        <option key={element} value={element}>{element}</option> 
                    )
                })} 
                
            </select>
        <button className={style.button} value='filtro' onClick={clearTemp}>ClearTemp</button>
    

        <section className={style.page}>
           
            <Paginado/>
        </section>
        </>
    )
}
}

