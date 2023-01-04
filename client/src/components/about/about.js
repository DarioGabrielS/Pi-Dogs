import { useState } from 'react'
import style from './about.module.css'

export const About = ()=>{

const [language, setLanguage]= useState('eng')

function handleClick (e){
 setLanguage(e.target.value)
}
    if(language==='eng'){
    return(
        <div className={style.container}>
            <h1>My name is Dario Gabriel Salvadore and I developed this SPA</h1>
            <section>
            <p>I'm a student at the Soy Henry academy and willing to become a FullStack Dev.<br/>
                PERN is my motto: PostGres, Express, React, Node.<br/>
                I did a very good job all by myself, imagine what we can do working toghether.<br/>
                For further info contact me through:
            </p>
            <h3>daerio@hotmail.com or DarioGabriel.Salvadore@gmail.com</h3>
            <h4>Thanks for your support!</h4>
            </section>
        <div>
            <button type='button' value='eng' onClick={handleClick}>ENGLISH</button>
            <button type='button' value='port' onClick={handleClick}>PORTUGUESE</button>
            <button type='button' value='spa' onClick={handleClick}>ESPAÑOL</button>
            <button type='button' value='it' onClick={handleClick}>ITALIAN0</button>
        </div>
        </div>
    )}
    if(language==='port'){
        return(
            <div className={style.container}>
                <h1>Meu nome é Dario Gabriel Salvadore e eu criei esta SPA</h1>
                <section>
                <p>Eu sou um estudante na Academia Soy Henry tentando me tornar un FullStack Dev.
                    Meu lema é PERN: PostGres, Express, React, Node.
                    Se eu criei isso me virando sozinho, imagina o que a gente pode fazer trabalhando junto.
                    Para mas informacao me escriva:
                </p>
                <h3>daerio@hotmail.com or DarioGabriel.Salvadore@gmail.com</h3>
                <h4>Obrigado pela atencao</h4>
                </section>
            <div>
                <button type='button' value='eng' onClick={handleClick}>ENGLISH</button>
                <button type='button' value='port' onClick={handleClick}>PORTUGUESE</button>
                <button type='button' value='spa' onClick={handleClick}>ESPAÑOL</button>
                <button type='button' value='it' onClick={handleClick}>ITALIAN0</button>
            </div>
            </div>
        )}
        if(language==='spa'){
            return(
                <div className={style.container}>
                    <h1>Mi nombre es Dario Gabriel Salvadore y desarrolle esta SPA</h1>
                    <section>
                    <p>Soy un estudiante de la academia Soy Henry aprendiendo para ser un FullStack Dev.
                        Mi lema es PERN: PostGres, Express, React, Node.
                        Si cree esta pagina trabajando solo, imaginate lo que podemos lograr trabajando juntos.
                        Para mas informacion contactame por:
                    </p>
                    <h3>daerio@hotmail.com or DarioGabriel.Salvadore@gmail.com</h3>
                    <h4>Gracias por la atencion!</h4>
                    </section>
                <div>
                    <button type='button' value='eng' onClick={handleClick}>ENGLISH</button>
                    <button type='button' value='port' onClick={handleClick}>PORTUGUESE</button>
                    <button type='button' value='spa' onClick={handleClick}>ESPAÑOL</button>
                    <button type='button' value='it' onClick={handleClick}>ITALIAN0</button>
                </div>
                </div>
            )}
            if(language==='it'){
                return(
                    <div className={style.container}>
                        <h1>Mi chiamo Dario Gabriel Salvadore e ho creato questa SPA</h1>
                        <section>
                        <p>Sono impariando nel istituto Soy Henry per diventare un FullStack Dev.
                            Il mio motto e PERN: PostGres, Express, React, Node.
                            Se ho creato questo da solo, imagina quanto possiamo fare insieme.
                            Per maggiori informazioni scrivere a:
                        </p>
                        <h3>daerio@hotmail.com or DarioGabriel.Salvadore@gmail.com</h3>
                        <h4>Grazie mille!</h4>
                        </section>
                    <div>
                        <button type='button' value='eng' onClick={handleClick}>ENGLISH</button>
                        <button type='button' value='port' onClick={handleClick}>PORTUGUESE</button>
                        <button type='button' value='spa' onClick={handleClick}>ESPAÑOL</button>
                        <button type='button' value='it' onClick={handleClick}>ITALIAN0</button>
                    </div>
                    </div>
                )}
}