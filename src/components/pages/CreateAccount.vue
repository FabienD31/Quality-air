<template>
  <div>
    <h1 class="text-center my-3">Créer un nouveau compte</h1>
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
            placeholder="6 caractères"
          />
        </b-form-group>
        <b-button type="submit" variant="primary">créer</b-button>

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
      if (this.password.length >= 6) {
        const newAdmin = await auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        await auth.signInWithEmailAndPassword(newAdmin);
        await this.$router.replace({ path: "/admin" });
      } else {
        this.messageError = " Le mot de passe est trop court ";
      }
    },
    initMesssageError() {
      this.messageError = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
