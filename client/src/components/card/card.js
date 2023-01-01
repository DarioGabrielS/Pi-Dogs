import React from 'react'
import style from './card.module.css'

export const Card = ({name, img, temperament, weight})=> {

    return(
        
        <div className={style.card}>


            <h3>{name || ''}</h3>
            <h5>Weight: {weight || ''} kg.</h5>
            <h5>Temperament: {temperament || ''}</h5>
            <img className={style.img} src={img} alt='Not found' />
        
        </div>
        
    )

}
