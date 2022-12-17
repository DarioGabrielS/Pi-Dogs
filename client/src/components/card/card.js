import React from 'react'
import style from './card.module.css'

export const Card = ({name, img, temper, weight})=> {

    return(
        <div className={style.card}>


            <h3>Name: {name}</h3>
            <h3>Weight: {weight}</h3>
            <h3>Temper: {temper}</h3>

        
        </div>

    )

}
//            <img src={img} alt='Image not found' />