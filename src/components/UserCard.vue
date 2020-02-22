<template>
  <b-col cols="6">
    <b-card
      class="mt-4"
      :title="card.info.name"
    >
      <b-card-text>{{ (card.info.plan) ? `${$t('plan')}: ${card.info.plan}` : $t('plan-empty') }}</b-card-text>

      <div class="d-flex align-items-center">
        <div v-if="user.loggedIn">
          <b-button v-if="checkLike()" variant="success" @click="$emit('remove-like', uid)"><b-icon-heart-fill></b-icon-heart-fill></b-button>
          <b-button v-else variant="secondary" @click="$emit('set-like', uid)"><b-icon-heart></b-icon-heart></b-button>
        </div>

        <span class="ml-auto text-right">{{ $t('likes') }}: {{ (card.likes) ? Object.keys(card.likes).length : 0 }}</span>
      </div>
    </b-card>
  </b-col>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'user-card',

  data() {
    return {
    }
  },

  props: {
    uid: {
      type: String,
      required: true
    },
    card: {
      type: Object,
      required: true
    }
  },

  mounted() {
    console.log('userCard', this.card)
  },

  methods: {
    checkLike() {
      return this.card.likes && this.card.likes[this.user.data.uid]
    },
  },

  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
};
</script>
