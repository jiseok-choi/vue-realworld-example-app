<template>
  <div>
    <div v-if="history.length === 0" class="article-preview">
      No history are here... yet.
    </div>
    <RwvHistory
      v-else
      v-for="hist in history"
      :hist="hist"
      :key="hist.createdAt"
    ></RwvHistory>
    <VPagination :pages="pages" :currentPage.sync="currentPage" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvHistory from "./VHistory";
import VPagination from "./VPagination";
import { FETCH_HISTORY } from "../store/actions.type";

export default {
  name: "HistoryList",
  components: {
    VPagination,
    RwvHistory
  },
  props: {
    history: {
      id: String,
      articleId: String,
      createdAt: String,
      type: String,
      userId: String
    },
    type: {
      type: String,
      required: false,
      default: "all"
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 20
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    listConfig() {
      const { type } = this;
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };
      return {
        type,
        filters
      };
    },
    pages() {
      if (this.historyCount <= this.itemsPerPage) {
        return [];
      }
      return [
        ...Array(Math.ceil(this.historyCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["historyCount", "history"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchHistory();
    }
  },
  mounted() {
    this.fetchHistory();
  },
  methods: {
    fetchHistory() {
      this.$store.dispatch(FETCH_HISTORY, this.listConfig);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
