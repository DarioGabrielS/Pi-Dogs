import { NavLink } from "react-router-dom"


export const NavBar = () =>{


    return(
        <>
            <NavLink to='/home'>
                <button type='button'>HOME</button>
            </NavLink>
            <NavLink to='/create'>
                <button type='button'>CREATE</button>
            </NavLink>
            <NavLink to='/about'>
                <button type='button'>ABOUT</button>
            </NavLink>
            
        </>
    )
}