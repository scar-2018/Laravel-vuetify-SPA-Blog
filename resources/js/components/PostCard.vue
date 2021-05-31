<template>
  <v-card>
    <img
      height="220"
      width="100%"
      src="img/cover.jpg"
      style="object-fit: cover;"
    />
    <v-chip
      class="ml-4 mt-4 mb-n4"
      label
      dark
      small
    >
      {{ post.category.name }}
    </v-chip>
    <v-card-title>{{ post.title }}</v-card-title>
    <v-card-subtitle>{{ post.ago }}</v-card-subtitle>
    <v-card-text>
      <div v-html="post.description"></div>
    </v-card-text>
    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-list-item-title><router-link :to="'/p/' + post.slug">Continue Reading</router-link></v-list-item-title>
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
import { mapState, mapActions } from 'vuex'

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
  },
  mounted() {
  },
  methods: {
    ...mapActions({
    })
  }
}
</script>
