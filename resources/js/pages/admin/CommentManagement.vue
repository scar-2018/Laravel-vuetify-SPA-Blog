<template>
  <v-card width="100%">
    <v-data-table
      :headers="headers"
      :items="comments"
      :loading="loadingComments"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Comments</v-toolbar-title>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="primary" :loading="submittingComment" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon class="" @click="deleteItem(item)">
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Email', value: 'author_email' },
        { text: 'Author Name', value: 'author_name' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: ''
      },
      defaultItem: {
        name: ''
      }
    }
  },
  computed: {
    ...mapState('comments', ['loadingComments', 'comments', 'submittingComment'])
  },

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  mounted() {
    this.getComments()
  },
  methods: {
    ...mapActions('app', ['showSuccess', 'showError']),
    ...mapActions('comments', ['getComments', 'deleteComment']),

    deleteItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        await this.deleteComment(this.editedIndex)
        this.closeDelete()
        this.showSuccess('Successfully Deleted')
        this.getComments()
      } catch (err) {
        this.showError(err)
      }
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  }
}
</script>