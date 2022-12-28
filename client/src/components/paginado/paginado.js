import { useState } from "react"
import { useSelector } from "react-redux"
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

function  handleClick (e) {
   if(e.target.value==='next'&& currentPage!=pagesTotal){
   
    const next = currentPage+1
    setCurrentPage(next)
   }
   if(e.target.value ==='previous' && currentPage!=1){
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
                 
   p.push(<Card 
        name={allDogs[i].name}
        img={allDogs[i].image} 
        temper={allDogs[i].temperament} 
        weight={allDogs[i].weight}/>)
}
return p}
return(
    
    <>
        <h1>Dogs per page{dogsPerPage}</h1>
        <h1>Total Pages{pagesTotal}</h1>
        <h1></h1>
        <button value='first' onClick={handleFirst}>First</button>
        <button type='click' value='previous' onClick={(e)=>handleClick(e)}>̣Prev</button>
        <div>{
        
            array.map(el=>{
                return <button value={el} key={el} onClick={handlePage}>{el}</button>
            })
        }
        </div>
        <button type='click' value= 'next' onClick={(e)=>handleClick(e)}>Next</button>
        <button value='last' onClick={handleFirst}>Last</button>
        <div className={style.page}>{
            display()
        }</div>
        <h3>Pagina actual {currentPage}</h3>
        <h1>Primer item{firstItem} Ultimo item {lastItem}</h1>
    </>
)

}