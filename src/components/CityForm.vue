<template>
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
</template>

<script>
export default {
  data() {
    return {
      newCity: null,
    };
  },
  methods: {
    addNewCity() {
      if (this.newCity) {
        this.$emit("cityAddEvent", this.newCity);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.textAddCity {
  font-size: 1.33em;
}
</style>
