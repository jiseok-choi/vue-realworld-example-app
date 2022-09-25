<template>
  <div class="article-preview">
    <h4>아티클을 {{ this.changeTypeString(hist.type) }} 하였습니다.</h4>
    <p v-text="hist.articleId" />
    <p v-text="hist.createdAt" />
  </div>
</template>
<script>
export default {
  name: "RwvHistory",
  props: {
    hist: {
      id: String,
      articleId: String,
      createdAt: String,
      type: String,
      userId: String
    }
  },
  methods: {
    changeTypeString(type) {
      if (type === "CREATE") {
        return "생성";
      } else if (type === "UPDATE") {
        return "수정";
      } else if (type === "DELETE") {
        return "삭제";
      }
    }
  }
};
</script>
