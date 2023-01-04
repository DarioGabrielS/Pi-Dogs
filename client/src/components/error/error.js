import style from './error.module.css'

export const Error = (error)=>{

    return(
        <div className={style.container}>

            <h1>An error has ocurred</h1>
            <h2>{error.message ? error.message : 'Error'}</h2>

        </div>
    )
}