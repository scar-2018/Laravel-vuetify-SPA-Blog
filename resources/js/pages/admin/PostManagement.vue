<template>
  <v-card width="100%">
    <v-data-table
      :headers="headers"
      :items="posts"
      :loading="loadingPosts"
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>posts</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="mb-2"
            to="/admin/posts/create"
          >
            <v-icon left>mdi-plus-circle</v-icon>
            New Post
          </v-btn>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="primary" :loading="loadingPost" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.category="{ item }">
        {{ item.category.name }}
      </template>
      <template v-slot:item.description="{ item }">
        <div v-html="item.description"></div>
      </template>
      <template v-slot:item.visits="{ item }">
        <v-chip small color="primary">{{ item.visits }}</v-chip>
      </template>
      <template v-slot:item.online="{ item }">
        <v-icon :color="item.online ? 'green' : 'grey'">mdi-checkbox-blank-circle</v-icon>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon class="mr-2" :to="`/admin/posts/edit/${item.slug}`">
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

    <v-pagination
      v-model="pagination.current"
      :length="pagination.total"
      @input="onPageChange"
    ></v-pagination>
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
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' },
        { text: 'Category', value: 'category' },
        { text: 'Visits', value: 'visits' },
        { text: 'Online', value: 'online' },
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
    ...mapState('posts', ['loadingPosts', 'loadingPost', 'posts', 'pagination'])
  },

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  mounted() {
    this.getPosts({})
  },
  methods: {
    ...mapActions('app', ['showSuccess', 'showError']),
    ...mapActions('posts', ['getPosts', 'deletePost']),

    deleteItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm () {
      try {
        const post = this.posts.find((post) => post.id === this.editedIndex)

        if (post) {
          await this.deletePost(post.slug)
          this.closeDelete()
          this.showSuccess('Successfully Deleted')
          this.getPosts({})
        }
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
    },

    onPageChange() {
      this.getPosts({
        page: this.pagination.current
      })
    }
  }
}
</script>