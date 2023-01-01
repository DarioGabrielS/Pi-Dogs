import style from './loading.module.css'

export const Loading = ()=>{

    return(
        <div className={style.card}>
            <h2>Data is Loading...</h2>
            <img src='' alt='Not Found'/>
        </div>
    )
}