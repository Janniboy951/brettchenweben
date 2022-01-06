module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/brettchenweben/" : "/",
  configureWebpack: {
    devtool: "source-map",
  },
};
