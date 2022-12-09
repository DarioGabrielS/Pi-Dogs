const axios = require("axios");
const { Temperamento } = require("../db");

const apiInfo = async () => {
  const tempApi = await Temperamento.findAll();

  if (tempApi.length) {
    return tempApi;
  } else {
    const api = await axios.get(
      "https://api.thedogapi.com/v1/breeds?api_key=live_CjVw33PeoFeCmjbewLCe8ah7kucer21vitjiQX4rX3iHJuYY7K6I3Lhfvysox9tS"
    );
    // de los datos que vienen de la api me quedo solo con los temperamentos
    const apiData = api.data.map((elem) => {
      return elem.temperament;
    });
    // a los elementos que me llegaron de la api los divido donde aparecen los caracteres ", "
    // pero solo si son del tipo string, no les doy bola a los undef
    const words = apiData.map((elem) => {
      if (typeof elem === "string") {
        return elem.split(", ");
      }
    });
    // aca ya tengo dentro de words cada uno de los temperamentos divididos en palabras



    // ahora quito duplicados
    const wordsunique = Array.from(new Set(words.flat()));

    // y filtro porque venian datos null
    const data = wordsunique.filter((el) => typeof el === "string");
    
    // convierto la info en objetos porque el bulkcreate acepta como parametros un array de objetos
    const dataObj = data.map((elem) => {
      return { name: elem };
    });
    // 
    const dbData = await Temperamento.bulkCreate(dataObj);

    return dbData;
  }
};
module.exports = {
  apiInfo,
};
