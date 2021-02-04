<template>
  <div>
    <h1 class="text-center my-3">Connexion</h1>
    <div class="w-50" style="margin: auto;">
      <b-form @submit="submitAction">
        <b-form-group label="Email">
          <b-form-input
            @change="initMesssageError"
            v-model="email"
            type="email"
          />
        </b-form-group>
        <b-form-group label="Mot de passe">
          <b-form-input
            @change="initMesssageError"
            v-model="password"
            type="password"
          />
        </b-form-group>
        <b-button type="submit" variant="primary">connexion</b-button>
        <b-button
          class="ml-3"
          type="button"
          to="/create-account"
          ariant="secondary"
          >créer un compte</b-button
        >
        <b-alert class="mt-2" show v-if="messageError" variant="danger">{{
          messageError
        }}</b-alert>
      </b-form>
    </div>
  </div>
</template>

<script>
import { auth } from "../../services/Firebase";
export default {
  data() {
    return {
      email: null,
      password: null,
      messageError: false,
    };
  },
  methods: {
    async submitAction(event) {
      event.preventDefault();
      try {
        await auth.signInWithEmailAndPassword(this.email, this.password);
        this.$router.replace({ path: "/admin" });
      } catch (error) {
        this.messageError = "Erreur de Login/Mot de passe";
        console.log("error", error);
      }
    },
    initMesssageError() {
      this.messageError = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 20px;
}
.form-group {
  input {
    margin-bottom: 20px;
  }
}
.login-page {
  align-items: center;
  display: flex;
  height: 100vh;

  h1 {
    margin-bottom: 1.5rem;
  }
}
</style>
