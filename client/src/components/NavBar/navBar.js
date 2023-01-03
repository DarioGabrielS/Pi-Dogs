import { NavLink } from "react-router-dom"
import style from './navBar.module.css'

export const NavBar = () =>{


    return(
        <div className={style.nav}>
            <NavLink to='/home'>
                <button type='button'>HOME</button>
            </NavLink>
            <NavLink to='/create'>
                <button type='button'>CREATE</button>
            </NavLink>
            <NavLink to='/about'>
                <button type='button'>ABOUT</button>
            </NavLink>
            
        </div>
    )
}