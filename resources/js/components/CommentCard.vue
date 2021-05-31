<template>
  <v-card>
    <v-card-title
      class="grey lighten-2 d-flex align-center justify-space-between"
    >
      <span>{{ comment.author_name }}</span>
      <span class="caption">{{ comment.ago }}</span>
    </v-card-title>
    <v-card-text>
      <div class="mt-4">
        {{ comment.content }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    comment: {
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
  }
}
</script>
