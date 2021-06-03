<template>
  <v-card width="100%">
    <v-data-table
      :headers="headers"
      :items="categories"
      :loading="loadingCategories"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Categories</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>mdi-plus-circle</v-icon>
                New Category
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-text-field
                    v-model="editedItem.name"
                    outlined
                    dense
                    placeholder="Category name"
                  ></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  :loading="submittingCategory"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="primary" :loading="submittingCategory" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.posts_count="{ item }">
        <v-chip small color="primary">{{ item.posts_count }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon class="mr-2" @click="editItem(item)">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
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
        { text: 'Name', value: 'name' },
        { text: 'Slug', value: 'slug' },
        { text: 'Posts', value: 'posts_count' },
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
    ...mapState('categories', ['loadingCategories', 'submittingCategory', 'categories']),

    formTitle () {
      return this.editedIndex === -1 ? 'New Category' : 'Edit Category'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  mounted() {
    this.getCategories()
  },
  methods: {
    ...mapActions('app', ['showSuccess', 'showError']),
    ...mapActions('categories', ['getCategories', 'updateCategory', 'deleteCategory', 'createCategory']),

    editItem (item) {
      this.editedIndex = this.categories.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        await this.deleteCategory(this.editedIndex)
        this.closeDelete()
        this.showSuccess('Successfully Deleted')
        this.getCategories()
      } catch (err) {
        this.showError(err)
      }
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save () {
      if (this.editedIndex > -1) {
        try {
          await this.updateCategory(this.editedItem)
          this.close()
          this.showSuccess('Successfully Updated')
          this.getCategories()
        } catch (err) {
          this.showError(err)
        }
      } else {
        try {
          await this.createCategory(this.editedItem)
          this.close()
          this.showSuccess('Successfully Created')
          this.getCategories()
        } catch (err) {
          this.showError(err)
        }
      }
    }
  }
}
</script>