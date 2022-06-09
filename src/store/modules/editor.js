import { axiosInstance } from "@/plugins/axios";

const state = {
  isLoadingMockData: false,
  mockData: null,
  mockDataErrors: null,
};
const getters = {
  isLoadingMockData: (state) => state.isLoadingMockData,
  mockData: (state) => state.mockData,
  mockDataErrors: (state) => state.mockDataErrors,
};
const mutations = {
  MOCK_DATA_LOADING: (state) => {
    state.isLoadingMockData = true;
  },
  MOCK_DATA_SUCCESS: (state, data) => {
    state.mockData = data;
    state.isLoadingMockData = false;
  },
  MOCK_DATA_FAIL: (state, e) => {
    state.mockDataErrors = e;
    state.isLoadingMockData = false;
  },
};
const actions = {
  getMockPdfData({ commit }) {
    commit("MOCK_DATA_LOADING");
    axiosInstance
      .get("/data/mockPdf.json")
      .then(({ data }) => {
        commit("MOCK_DATA_SUCCESS", data);
      })
      .catch((e) => {
        commit("MOCK_DATA_FAIL", e.response);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
