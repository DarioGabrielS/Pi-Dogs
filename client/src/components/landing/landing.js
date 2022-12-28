import { NavLink } from "react-router-dom";
import style from "./landing.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getDogs} from "./../../redux/actions";

export const Landing = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);


  // useEffect(()=>{
  //   dispatch(getDogs())
  // },[dispatch])

  //  {
  //   useEffect(() => {
  //     if (allDogs.length){
  //     dispatch(getdogs());
  //   }}, [dispatch]);
  // }

  if (!allDogs.length)  dispatch(getDogs());

  return (
    <div className={style.landing}>
      <h1>Welcome to the Dog enciclopedia</h1>
      <NavLink to="/home">
        <button className={style.button}>Enter</button>
      </NavLink>
      <NavLink to="/paginado">
        <button className={style.button}>Paginado</button>
      </NavLink>
    </div>
  );
};

