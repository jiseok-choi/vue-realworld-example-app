import {
  TagsService,
  ArticlesService,
  HistoryService
} from "@/common/api.service";
import { FETCH_ARTICLES, FETCH_HISTORY, FETCH_TAGS } from "./actions.type";
import {
  FETCH_START,
  FETCH_END,
  SET_TAGS,
  UPDATE_ARTICLE_IN_LIST,
  SET_HISTORY
} from "./mutations.type";

const state = {
  tags: [],
  articles: [],
  isLoading: true,
  articlesCount: 0,
  history: [],
  historyCount: 0
};

const getters = {
  articlesCount(state) {
    return state.articlesCount;
  },
  articles(state) {
    return state.articles;
  },
  isLoading(state) {
    return state.isLoading;
  },
  tags(state) {
    return state.tags;
  },
  history(state) {
    return state.history;
  },
  historyCount(state) {
    return state.historyCount;
  }
};

const actions = {
  [FETCH_ARTICLES]({ commit }, params) {
    commit(FETCH_START);
    return ArticlesService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_TAGS]({ commit }) {
    return TagsService.get()
      .then(({ data }) => {
        commit(SET_TAGS, data.tags);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_HISTORY]({ commit }) {
    return HistoryService.get()
      .then(({ data }) => {
        commit(SET_HISTORY, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, { articles, articlesCount }) {
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoading = false;
  },
  [SET_TAGS](state, tags) {
    state.tags = tags;
  },
  [UPDATE_ARTICLE_IN_LIST](state, data) {
    state.articles = state.articles.map(article => {
      if (article.slug !== data.slug) {
        return article;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      article.favorited = data.favorited;
      article.favoritesCount = data.favoritesCount;
      return article;
    });
  },
  [SET_HISTORY](state, { history, historyCount }) {
    state.history = history;
    state.historyCount = historyCount;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
