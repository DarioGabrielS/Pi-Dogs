import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Card } from "../card/card"
import style from "./paginado.module.css"

export const Paginado = ()=>{

const allDogs = useSelector((state)=> state.allDogs)
const dogsPerPage = 8
const pagesTotal = Math.ceil(allDogs.length/dogsPerPage)
const [currentPage, setCurrentPage] = useState(1)
const firstItem = (currentPage*dogsPerPage)-dogsPerPage
const lastItem = (currentPage*dogsPerPage)-1
//const arr=[]
const filterOn = useSelector(state=>state.filterOn)

useEffect(()=>{
    
    setCurrentPage(1)
},[filterOn])

function  handleClick (e) {
   if(e.target.value==='next'&& currentPage!==pagesTotal){
   
    const next = currentPage+1
    setCurrentPage(next)
   }
   if(e.target.value ==='previous' && currentPage!==1){
    const back = currentPage-1
    setCurrentPage(back)
    }
}
function handlePage (e) {
    setCurrentPage(parseInt(e.target.value))
}
function handleFirst (e) {
    if(e.target.value ==='first'){
        setCurrentPage(1)
    }else{
        setCurrentPage(pagesTotal)
    }
}
const array=[]
for(let i=1; i<=pagesTotal;i++){
    array.push(i)
}
let p=[]
function display(){

    for(let i=firstItem; i<=lastItem; i++){
   if(allDogs.length<1){
    return(<div className={style.message}>
                <h3>Could not find requested dogs</h3>
            </div>)
   } 
   if( typeof(allDogs[i]) != 'undefined'){              
   p.push(<section className={style.section} key={allDogs[i].id}>
    <NavLink to={`/breeds/${allDogs[i].id}` } className={style.nav}>
            <Card 
                key={allDogs[i].id}
                name={allDogs[i].name}
                img={allDogs[i].image} 
                temperament={allDogs[i].temperament } 
                weight={allDogs[i].weight }/>
         </NavLink>
         </section>)
        }
    else {
        
    }
} return p

}
return(
    
    <>
        <div className={style.menu}>
        <button className={style.button} value='first' onClick={handleFirst}>First</button>
        <button className={style.button} type='click' value='previous' onClick={(e)=>handleClick(e)}>̣Prev</button>
        
       {
        
            array.map(el=>{
                return <button  id={el} value={el} key={el} onClick={handlePage}>{el}</button>
            })
        }
        
        <button className={style.button} type='click' value= 'next' onClick={(e)=>handleClick(e)}>Next</button>
        <button className={style.button} value='last' onClick={handleFirst}>Last</button>
        <h4> Page {currentPage}</h4>
        </div>
        <section className={style.page}>{
            display()
        }</section>
        
    </>
)

}