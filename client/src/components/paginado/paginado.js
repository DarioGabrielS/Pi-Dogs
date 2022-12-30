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
const arr=[]
const filterOn = useSelector(state=>state.filterOn)

useEffect(()=>{
    const init = 1
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
function display(){for(let i=firstItem; i<=lastItem; i++){
   if(allDogs.length<1){
    return(<div><h3>Could not find requested dogs</h3></div>)
   } 
   if( typeof(allDogs[i]) != 'undefined'){              
   p.push(<NavLink to={`/details/${allDogs[i].id}`}>
            <Card 
                name={allDogs[i].name}
                img={allDogs[i].image} 
                temperament={allDogs[i].temperament } 
                weight={allDogs[i].weight }/>
         </NavLink>)
        }
    else {
        
    }
    } return p
}
return(
    
    <>
        {/* <h1>Dogs per page{dogsPerPage}</h1>
        <h1>Total Pages{pagesTotal}</h1>
        <h1></h1> */}
        <button value='first' onClick={handleFirst}>First</button>
        <button type='click' value='previous' onClick={(e)=>handleClick(e)}>̣Prev</button>
        <>{
        
            array.map(el=>{
                return <button value={el} key={el} onClick={handlePage}>{el}</button>
            })
        }
        </>
        <button type='click' value= 'next' onClick={(e)=>handleClick(e)}>Next</button>
        <button value='last' onClick={handleFirst}>Last</button>
        <div className={style.page}>{
            display()
        }</div>
        <h4>Current Page {currentPage}</h4>
        {/* <h1>Primer item{firstItem} Ultimo item {lastItem}</h1> */}
    </>
)

}