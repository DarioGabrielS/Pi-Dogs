import { useState } from "react"
import { useSelector } from "react-redux"

export const Paginado = ()=>{

const allDogs = useSelector((state)=> state.allDogs)
const dogsPerPage = 8
const pagesTotal = Math.ceil(allDogs.length/dogsPerPage)
const [currentPage, setCurrentPage] = useState(1)
const firstItem = (currentPage*dogsPerPage)-dogsPerPage
const lastItem = (currentPage*dogsPerPage)-1
const arr=[]

for(let i=firstItem; i=lastItem; i++){
    arr.push(allDogs[i])

}

function  handleClick (e) {
    const up = currentPage
    setCurrentPage(up+1)
}
return(
    
    <>
    <h1>{dogsPerPage}</h1>
    <h1>{pagesTotal}</h1>
    <h1></h1>
    <button type='click' onClick={(e)=>handleClick(e)}>SwithPage</button>
    <h3>{currentPage}</h3>
    <h1>{firstItem}{lastItem}</h1>
    </>
)

}