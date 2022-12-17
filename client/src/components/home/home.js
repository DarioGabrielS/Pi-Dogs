import { NavLink } from "react-router-dom"
import  {Card}  from "../card/card.js"

export const Home = ()=>{
    return(
        <>
        <h1>Este es el home</h1>
        <NavLink to='/'>
            <button>Landing</button>
        </NavLink>
        <NavLink to='/create'>
            <button>Create Breed</button>
        </NavLink>
        <Card name="SanMi Terrier" weight='18' temper='Playful, Smart' />
        <Card name="SanMi Terrier" weight='18' temper='Playful, Smart' />
        </>
    )
}