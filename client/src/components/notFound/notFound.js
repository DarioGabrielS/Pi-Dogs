import style from './notFound.module.css'
export const NotFound = ()=>{


    return(
        <div className={style.outer}>
            <div className={style.container}>
                <h2>Error 404</h2>
                <br></br>
                
                <h2>The page you are trying to reach is not available</h2>
            </div>
        </div>
    )
}
