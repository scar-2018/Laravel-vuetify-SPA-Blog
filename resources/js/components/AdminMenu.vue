<template>
  <v-list
    nav
    dense
  >
    <v-list-item-group
      color="primary"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { text: 'Dashboard', icon: 'mdi-monitor-dashboard', to: '/admin/dashboard' },
        { text: 'Categories', icon: 'mdi-hexagon-multiple', to: '/admin/categories' },
        { text: 'Posts', icon: 'mdi-file-document', to: '/admin/posts' },
        { text: 'Comments', icon: 'mdi-comment-multiple', to: '/admin/comments' }
      ]
    }
  }
}
</script>