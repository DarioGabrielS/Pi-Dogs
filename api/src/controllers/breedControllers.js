const axios = require('axios')
const {Raza, Temperamento} = require('../db')

const getBreeds = async () => {

    const apiInfo = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=live_CjVw33PeoFeCmjbewLCe8ah7kucer21vitjiQX4rX3iHJuYY7K6I3Lhfvysox9tS')
    const apiData = apiInfo.data.map(elem =>{
        return{
            id: elem.id,
            name: elem.name,
            image: elem.image.url,
            weight: elem.weight.metric,
            temperament: elem.temperament,
            origin: "api",
            life_span: elem.life_span,
            height: elem.height.metric

        }
    })

    const dbInfo = await Raza.findAll({
        // include: {
        //     model:Temperamento,
        //     attributes:["name"],
        //     through:{
        //         attributes:[]
        //     }}
        include: Temperamento
    })
    if(dbInfo.length){
    const dbData = dbInfo.map(elem=>{
        return{
            id: elem.id,
            name: elem.name,
//            image: elem.image,
            weight: elem.weight,
            height: elem.height,
            origin: "db",
            temperament: elem.temperament,
            life_span: elem.life_span
        }
    
    })
        return [...apiData,...dbData]
    } else {
        return apiData
    }

}

const getDetails = async (id)=>{
    const dogs = await getBreeds()
    const singleDog = dogs.filter(e => {
        return e.id.toString() === id.toString()
    })
    const dogDetails = singleDog.map(e=>{
        console.log(e)
        return{
            name: e.name,
            weight: e.weight,
            height: e.height,
            life_span: e.life_span,
            temperament: e.temperament,
            img: e.image,            

        }
    })
    console.log(dogDetails)
    return dogDetails
}

const createDog = async (body) =>{
    
    const { name, temperament, height, weight, life_span } = body
    const newDog = await Raza.create({
        name,
        height,
        weight,
        life_span,
    })

    const temp = Temperamento.findAll({
        where: {name : temperament.toLowerCase()}
    })

    //await newDog.addTemperamento(temp)

    const send = await Raza.findAll({
        where: {name: name},
        include: {
                model:Temperamento,
                attributes:["name"],
                through:{
                    attributes:[]
                }}
    })
    console.log(send)
    return send
}

module.exports={
    getBreeds,
    getDetails,
    createDog,
}

/* imagen,
 nombre 
  temperamento)
[ ] Altura
[ ] Peso
[ ] Años de vida
*/