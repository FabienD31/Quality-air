<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/">Accueil</b-nav-item>
        <b-nav-item to="/admin">Admin</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="connected" class="ml-auto">
        <b-nav-item>
          <b-button @click="logout" variant="dark" class="mb-2 ">
            <b-icon icon="power"></b-icon> Logout
          </b-button>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { auth } from "../services/Firebase";
export default {
  data() {
    return {
      connected: false,
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.connected = true;
      } else {
        this.connected = false;
      }
    });
  },
  methods: {
    logout() {
      auth.signOut();
      this.$router.replace("/"); //permet de retourner à la page d'accueil
    },
  },
};
</script>

<style lang="scss" scoped></style>
