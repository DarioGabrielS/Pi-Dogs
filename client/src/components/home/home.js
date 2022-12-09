import { NavLink } from "react-router-dom"

export const Home = ()=>{
    return(
        <>
        <h1>Este es el home</h1>
        <NavLink to='/'>
            <button>Landing</button>
        </NavLink>
        </>
    )
}