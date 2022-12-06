const axios = require('axios')
const { Temperamento } = require('../db')

const apiInfo = async ()=>{
 
    const api = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=live_CjVw33PeoFeCmjbewLCe8ah7kucer21vitjiQX4rX3iHJuYY7K6I3Lhfvysox9tS')
    const apiData = api.data.map(elem =>{
    return(elem.temperament)
})


const words = apiData.map(elem=>{
   if(typeof(elem)==="string"){
    return elem.split(", ")
  }
})

//quito duplicados
const wordsunique = Array.from(new Set(words.flat())) 


// filtro porque venian datos null
const data = wordsunique.filter(el=> typeof(el)=== "string")
const dataObj = data.map(elem=>{
  return {name:elem}
})

 const dbData = await Temperamento.bulkCreate(data)
console.log(dataObj)
console.log(dbData)
return dbData
}

module.exports = {
    apiInfo
}