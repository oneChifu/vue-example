<template>
  <div>
    <h1 class="display-4">{{ $t('users-list') }}</h1>

    <b-row>
      <UserCard 
        v-if="!checkCurrentUser(uid)"
        v-for="(card, uid) in users"
        :key="uid"
        :card="card"
        :uid="uid"
        @set-like="setLike"
        @remove-like="removeLike"
      />
    </b-row>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard";
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "users",

  data() {
    return {
      users: {},
      loading: true,
    }
  },

  components: {
    UserCard
  },

  async mounted() {
    this.users = await this.getUsers()
    this.loading = false
  },

  computed: {
    ...mapGetters({
      user: 'user'
    })
  },

  methods: {
    async getUsers() {
      firebase.database().ref('/users').once('value', snap => {
        this.users = snap.val()
      })
    },

    async setLike(uid) {
      if ( !this.user.loggedIn ) {
        this.$router.push("login")
      } else {
        await firebase.database().ref(`/users/${uid}/likes`).update({
          [this.user.data.uid]: true
        })

        this.users[uid] = Object.assign({}, this.users[uid], {
          likes: Object.assign({}, this.users[uid].likes, {
            [this.user.data.uid]: true
          })
        })
      }
    },

    async removeLike(uid) {
      await firebase.database().ref(`/users/${uid}/likes/${this.user.data.uid}`).remove()
      this.$delete(this.users[uid].likes, this.user.data.uid)
    },

    checkCurrentUser(uid) {
      return this.user.loggedIn && this.user.data.uid == uid
    },
  }
};
</script>
