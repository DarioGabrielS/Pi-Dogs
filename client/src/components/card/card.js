import React from 'react'
import style from './card.module.css'

export const Card = ({name, img, temper, weight})=> {

    return(
        <div>
        <div className={style.card}>


            <h3>{name}</h3>
            <h5>Weight: {weight} kg.</h5>
            <h5>Temperament: {temper}</h5>
            <img className={style.img} src={img} alt='Image not found' />
        
        </div>
        </div>
    )

}
//            <img src={img} alt='Image not found' />