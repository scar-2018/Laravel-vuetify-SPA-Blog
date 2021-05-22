<template>
  <v-card
  >
    <v-list shaped>
      <v-list-item-group
        :value="value"
        @change="updateValue"
      >
        <v-list-item
          v-for="(ct, i) in categories"
          :key="i"
          :value="ct.slug"
          active-class="primary--text"
        >
          <v-list-item-content>
            <v-list-item-title v-text="ct.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-chip
              :color="value == ct.slug ? 'primary' : ''"
            >
              {{ ct.posts_count }}
            </v-chip>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    props: {
      categories: {
        type: Array,
        default: () => []
      },
      value: {
        type: String
      }
    },
    data() {
      return {

      }
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value)
      }
    }
  }
</script>