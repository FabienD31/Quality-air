<template>
  <div class="my-3">
    <b-card :title="city.name" :class="color">
      <b-card-text v-if="!loading">
        Qualité de l'air : {{ city.iqa }}
      </b-card-text>

      <b-spinner
        v-if="loading"
        variant="primary"
        label="Spinning"
        type="grow"
      ></b-spinner>
    </b-card>
      <b-icon-trash-fill
        @click="deleteCity"
        variant="secondary"
      ></b-icon-trash-fill>
  </div>
</template>

<script>
import { AirQualityService } from "../services/airQuality.service";
export default {
  props: {
    city: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      color: "",
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    const infoCity = await AirQualityService.getQualityAir(this.city.name);
    this.loading = false;
    this.city.iqa = infoCity.aqi;

    if (this.city.iqa <= 30) {
      this.color = "pollution-faible";
    }
    if (this.city.iqa <= 50 && this.city.iqa > 30) {
      this.color = "pollution-moyenne";
    }
    if (this.city.iqa > 50) {
      this.color = "pollution-forte";
    }
  },
  methods: {
    deleteCity() {
      this.$emit("deleteCity", this.city);
    },
  },
};
</script>

<style lang="scss" scoped>
.pollution-faible {
  background-color: green;
  color: white;
}
.pollution-moyenne {
  background-color: rgb(202, 133, 5);
  color: white;
}
.pollution-forte {
  background-color: rgb(202, 7, 7);
  color: white;
}
</style>
