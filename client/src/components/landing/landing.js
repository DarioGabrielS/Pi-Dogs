import { NavLink } from "react-router-dom";
import style from "./landing.module.css";

import { useSelector, useDispatch } from "react-redux";
import {getDogs} from "./../../redux/actions";

export const Landing = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
 

  if (!allDogs.length)  dispatch(getDogs());
  

  return (
    <>
        <div className={style.landing}>
          <h1>DogPedia</h1>
          <br></br>
          <NavLink to="/home">
              <button className={style.button}>Enter</button>
          </NavLink>
        </div>
        
    </>
  );
};

