<template>
  <div class="profile-page">
    <HistoryList :favorited="favorited" :items-per-page="5"> </HistoryList>
  </div>
</template>

<script>
import HistoryList from "@/components/HistoryList";

export default {
  name: "RwvArticleHistory",
  components: {
    HistoryList
  },
  computed: {
    favorited() {
      return this.$route.params.username;
    }
  }
};
</script>
