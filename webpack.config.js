const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackRTLPlugin = require("webpack-rtl-plugin");
const WebpackMessages = require("webpack-messages");
const del = require("del");

const themeName = "metronic";

const rootPath = path.resolve(__dirname);
const distPath = rootPath + "/src";

const entries = {
  "sass/style.react": "./src/index.scss",
};

const mainConfig = function() {
  return {
    mode: "development",
    stats: "errors-only",
    performance: {
      hints: false,
    },
    entry: entries,
    output: {
      path: distPath,
      filename: "[name].js",
    },
    resolve: { extensions: [".scss"] },
    plugins: [
      new WebpackMessages({
        name: themeName,
        logger: (str) => console.log(`>> ${str}`),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new WebpackRTLPlugin({
        filename: "[name].rtl.css",
      }),
      {
        apply: (compiler) => {
          compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
            (async () => {
              await del.sync(distPath + "/sass/*.js", { force: true });
            })();
          });
        },
      },
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
  };
};

module.exports = function() {
  return [mainConfig()];
};
