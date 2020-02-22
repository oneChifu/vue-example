<template>
  <div>
    <h1 class="display-3 mb-4">{{ user.data.info.name }}</h1>

    <dl class="row">
      <dt class="col-sm-3">{{ $t('email') }}:</dt>
      <dd class="col-sm-9">{{ user.data.email }}</dd>

      <dt class="col-sm-3">{{ $t('plan') }}:</dt>
      <dd class="col-sm-9">
        <b-link :to="'profile-plan'">{{ user.data.info.plan ? $t('plan-change') : $t('plan-select') }}</b-link>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "profile",

  data() {
    return {
    }
  },

  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
};
</script>
