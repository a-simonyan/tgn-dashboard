module.exports = {
  css: {
    loaderOptions: {
      scss: {
        implementation: require('node-sass'),
        additionalData: `@import "@/assets/styles/main.scss";`,
      },
    },
  },
};
