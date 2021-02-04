import {config} from "@/config/config.js"
import axios from "axios"

const baseURL = "https://api.waqi.info/feed/"

export const AirQualityService= {

  async getQualityAir(cityName) {
    const url = `${baseURL}${cityName}/?token=${config.token}`;

    try {

      const result = await axios.get(url);
      return result.data.data; //se trouve dans l'objet recupérable grace à un console.log(result)
    } catch (error) {
      alert('voir la console tu as fais une erreur')
      console.log("error",error);
    }

  }
}