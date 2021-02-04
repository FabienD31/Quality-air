import {db} from "./Firebase"

const citiesCol = db.collection("cities");

export const citiesService = {
  async getCities() {
    const citiesDoc = await citiesCol.get();

    const cities = citiesDoc.docs.map(city => Object.create({...city.data(), id: city.id }));
    
    return cities;
  },
  async addNewCity(city) {
    const result = await citiesCol.add(city);
    return result.id ; },

  deleteCity(city) {
  const citiesColDelete = citiesCol.doc(city.id);
  citiesColDelete.delete();
}
}
