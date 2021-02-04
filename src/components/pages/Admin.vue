<template>
  <div>
    <h1>test</h1>
    <div class="row form-group addCity my-5">
      <div class="col-sm-2">
        <p class="textAddCity">
          Ajouter une ville :
        </p>
      </div>
      <div class="col-sm-3">
        <input
          type="text"
          id="cityField"
          class="form-control"
          v-model="newCity"
        />
      </div>
      <div class="col-sm-2">
        <b-button @click="addNewCity" variant="primary">Ajouter</b-button>
      </div>
    </div>
    <ul>
      <li v-for="city in cities" :key="city.id">
        {{ city.name }}
        <b-icon-trash-fill @click="deleteCity(city)"></b-icon-trash-fill>
      </li>
    </ul>
  </div>
</template>

<script>
import { citiesService } from "@/services/cityService.service";

export default {
  data() {
    return {
      cities: [],
      newCity: "",
    };
  },
  async mounted() {
    this.cities = await citiesService.getCities();
  },
  methods: {
    async addNewCity() {
      const city = { name: this.newCity, iqa: 0 };
      const idCity = await citiesService.addNewCity(city);
      city.id = idCity;
      this.cities.push(city);
    },
    deleteCity(city) {
      citiesService.deleteCity(city);
      const IndexToDelete = this.cities.findIndex((c) => city.id === c.id);
      this.cities.splice(IndexToDelete, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
