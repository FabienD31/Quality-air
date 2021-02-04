<template>
  <div>
    <div class="my-2">
      <h1>Indice de la qualité de l'air</h1>
      <div class="row">
        <div class="col-sm-4" v-for="city in cities" :key="city.index">
          <City @deleteCity="deleteCity" :city="city"></City>
        </div>
      </div>
      <CityForm @cityAddEvent="cityAddAction" />
      <Alert v-if="showAlert" :type="typeMessage" :message="alertMessage" />
    </div>
  </div>
</template>

<script>
import City from "@/components/City";
import CityForm from "@/components/CityForm.vue";
import Alert from "@/components/Alert";
import { AirQualityService } from "@/services/airQuality.service";
import { citiesService } from "@/services/cityService.service";
export default {
  components: {
    City,
    CityForm,
    Alert,
  },
  data() {
    return {
      cities: [],
      alertMessage: "",
      typeMessage: "",
      showAlert: false,
    };
  },
  async mounted() {
    this.cities = await citiesService.getCities();
  },
  methods: {
    async cityAddAction(cityName) {
      const dataFornewCity = await AirQualityService.getQualityAir(cityName);
      console.log(dataFornewCity);
      if (dataFornewCity !== "Unknown station") {
        this.cities.push({
          name: cityName,
          iqa: null,
        });
        this.typeMessage = "success";
        this.alertMessage = "Ville ajoutée avec succées";
        this.showAlert = true;
      } else {
        this.typeMessage = "warning";
        this.alertMessage = "Ville non disponible";
        this.showAlert = true;
      }
    },
    deleteCity(city) {
      const indexDelete = this.cities.findIndex((c) => c.name === city.name);
      this.cities.splice(indexDelete, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
