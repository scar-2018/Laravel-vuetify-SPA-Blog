<template>
  <v-card
    width="600"
  >
    <v-img
      height="250"
      src="cover.jpg"
    ></v-img>
    <v-chip class="ml-4 mt-2" label color="" dark>
      <v-icon left>
        mdi-label
      </v-icon>
      {{ categoryById(post.category_id).name }}
    </v-chip>
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-subtitle>{{ post.created_at }}</v-card-subtitle>
    <v-card-text>
      {{ post.content }}
    </v-card-text>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-list-item-title><router-link to="/">Continue Reading</router-link></v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
          <span class="subheading">{{ post.visits }} visits</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'

  export default {
    props: {
      post: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters({
        categoryById: 'categories/categoryById'
      })
    },
    mounted() {
    },
    methods: {
      ...mapActions({
      })
    }
  }
</script>
