<template>
  <b-container class="vh-100">
    <b-row class="vh-100" align-v="center" align-h="center">
      <b-col cols="6">
        <b-form
          @submit="submitHandler"
          class="bg-white p-4 rounded"
        >
          <b-form-group id="input-group-1" label="Email:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Введите email адрес"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Пароль:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              required
              placeholder="Введите пароль"
            ></b-form-input>
          </b-form-group>

          <div class="d-flex align-items-center">
            <b-button type="submit" :disabled="form.disabled" variant="primary"
              >Войти</b-button
            >
            <b-button v-bind:to="'/'" class="ml-2">Отмена</b-button>

            <div class="ml-auto">
              <b-link :to="'registration'">Регистрация</b-link>
            </div>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "login",

  data() {
    return {
      form: {
        email: "",
        password: "",
        disabled: false
      }
    };
  },

  watch: {

  },

  methods: {
    async submitHandler(e) {
      e.preventDefault()

      const forData = {
        email: this.form.email,
        password: this.form.password
      };

      try {
        await this.$store.dispatch("login", forData)
        this.$router.push("/");
      } catch (e) {}
    }
  }
};
</script>
