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
  import { mapState, mapActions } from 'vuex'

  export default {
    props: {
      value: {
        type: String
      }
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        categories: (state) => state.categories.categories
      })
    },
    mounted() {
      this.getCategories()
    },
    methods: {
      ...mapActions({
        getCategories: 'categories/getCategories'
      }),
      updateValue(value) {
        this.$emit('input', value)
      }
    }
  }
</script>