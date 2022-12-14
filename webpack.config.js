const path = require("path");
const cwd = process.cwd();

const isDevelopment = process.env.NODE_ENV !== "production";

const publicFolderPath = path.join(cwd, "public");
const outputPath = path.join(cwd, "dist");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const styleLoaders = ({ modules }) => [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      importLoaders: 1,
      sourceMap: !!isDevelopment,
      modules,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        ident: "postcss",
        config: false,
        plugins: [
          "postcss-flexbugs-fixes",
          [
            "postcss-preset-env",
            {
              autoprefixer: {
                flexbox: "no-2009",
              },
              stage: 3,
            },
          ],
          "postcss-normalize",
        ],
      },
    },
  },
  {
    loader: "sass-loader",
    options: {
      sassOptions: {
        includePaths: [path.join(cwd, "node_modules")],
      },
    },
  },
];

const config = {
  entry: "./src/index.ts",
  output: {
    path: outputPath,
    publicPath: "/",
    filename: isDevelopment ? "[name].js" : "[name]-[chunkhash].js",
  },
  mode: isDevelopment ? "development" : "production",
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
  },
  devServer: {
    static: "./dist",
  },
  devtool: isDevelopment ? "eval-source-map" : "source-map",
  // cache: false,
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("swc-loader"),
            options: {
              jsc: {
                baseUrl: "src",
                paths: {
                  "@services/*": ["services/*"],
                  "@i18n": ["i18n"],
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module.(sa|sc|c)ss$/,
        use: styleLoaders({ modules: { mode: "icss" } }),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf|webp)$/,
        type: "asset/resource",
      },
      { test: /\.json$/, type: "json" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
    }),
  ].filter(Boolean),
  optimization: {
    runtimeChunk: "single",
  },
};

module.exports = config;
