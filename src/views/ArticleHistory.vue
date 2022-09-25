<template>
  <div class="profile-page">
    <HistoryList :items-per-page="5"> </HistoryList>
  </div>
</template>

<script>
import HistoryList from "@/components/HistoryList";

export default {
  name: "RwvArticleHistory",
  components: {
    HistoryList
  }
};
</script>
