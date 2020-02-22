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

          <b-form-group
            id="input-group-2"
            label="Полное имя:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.name"
              type="text"
              required
              placeholder="Введите имя и фамилию"
              minlength="3"
              maxlength="35"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Пароль:" label-for="input-2">
            <b-form-input
              id="input-3"
              v-model="form.password"
              type="password"
              required
              placeholder="Введите пароль"
              minlength="6"
              maxlength="25"
            ></b-form-input>
          </b-form-group>

          <div class="d-flex align-items-center">
            <b-button type="submit" :disabled="form.disabled" variant="primary"
              >Зарегистрироватся</b-button
            >
            <b-button v-bind:to="'/'" class="ml-2">Отмена</b-button>

            <div class="ml-auto">
              <b-link :to="'login'">Вход</b-link>
            </div>
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "registration",

  data() {
    return {
      form: {
        email: "",
        name: "",
        password: "",
        disabled: false
      }
    };
  },

  methods: {
    async submitHandler(e) {
      e.preventDefault()

      const forData = {
        email: this.form.email,
        password: this.form.password,
        name: this.form.name
      };

      try {
        await this.$store.dispatch("logout")
        await this.$store.dispatch("registation", forData)
        this.$router.push("/");
      } catch (e) {}
    }
  }
};
</script>
