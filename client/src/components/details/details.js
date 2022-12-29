import style from './details.module.css'


export function Details(dog){

    return(
        <>
            <h3>Name: {dog.name}</h3>
            <h4>Temp: {dog.temperament}</h4>
            <h4>Weight: {dog.weight}</h4>
            <h4>Height: {dog.height}</h4>
            <h4>Life span: {dog.life_span}</h4>
            <img src={dog.image} alt='Not found'/>
        </>
    )

    
}