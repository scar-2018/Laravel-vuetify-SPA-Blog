<template>
  <v-dialog
    :value="value"
    max-width="500px"
    @input="$emit('input', value)"
  >
    <v-card>
      <v-card-title>Are you sure you want to delete this item?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="primary" :loading="loading" @click="$emit('submit')">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  }
}
</script>