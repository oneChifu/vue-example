<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand :to="'/'">{{ $t('tikal-center') }}</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item :to="'users'">{{ $t('users') }}</b-nav-item>
            <b-nav-item :to="'plans'">{{ $t('plans') }}</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-dropdown v-if="user.loggedIn" id="dropdown-1" variant="outline-light" :text="user.data.email" right>
              <b-dropdown-item :to="'profile'">{{ $t('profile') }}</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="logout">{{ $t('logout') }}</b-dropdown-item>
            </b-dropdown>

            <div v-else>
              <b-button :to="'login'" variant="success">{{ $t('login2') }}</b-button>
              <b-button :to="'registration'" variant="light" class="ml-2">{{ $t('registration') }}</b-button>
            </div>

            <b-dropdown :text="$i18n.locale" variant="secondary" class="ml-3" right>
              <b-dropdown-item v-for="(lang, i) in langs" :key="`Lang${i}`" @click="changeLang(lang)">{{lang}}</b-dropdown-item>
            </b-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      langs: ["en", "ru"]
    }
  },

  methods: {
    async logout() {
      await this.$store.dispatch("logout")
      await this.$router.push("/")
    },

    changeLang(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('language/setLanguage', lang)
    }
  },

  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
};
</script>
