const path = require('path');
const glob = require("glob");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('imagemin-webpack-plugin').default;
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
    entry: './src/main.js',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
          {
            test: /\.js$/, // Apply this rule to files ending in .js
            exclude: /(node_modules)/, // Do not apply to files residing in node_modules
            use: {
              loader: 'babel-loader', // Use this loader
              options: {
                presets: ['@babel/preset-env'], // transpile our ES6 to ES5
              },
            },
          },
          {
            test:/(\.css)$/, // Apply rule to .css files
            sideEffects: true,
            use: [
                MiniCssExtractPlugin.loader,
                // {
                //   loader: "sass-loader",
                //   options: {
                //     implementation: require("sass"),
                //   },
                // },
              'css-loader' 
            ],
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/, // Apply rule to images (.png, .svg, .jpg, .jpeg, .gif)
            use: [
              'file-loader', // This loader resolves import/require() on a file into a url and emits the file into the output directory.
              {
                loader: 'image-webpack-loader', // Next, we use the image-webpack-loader to optimize images
                options: {
                  name: '[name][hash].[ext]',
                  esModule: false,
                  mozjpeg: {
                    progressive: true,
                  },
                  // optipng.enabled: false will disable optipng
                  optipng: {
                    enabled: true,
                  },
                  pngquant: {
                    quality: [0.65, 0.90],
                    speed: 4
                  },
                  gifsicle: {
                    interlaced: true,
                    optimizationLevel: 3,
                  },
                  // the webp option will enable WEBP
                  webp: {
                    quality: 75,
                    enabled: true,
                  }
                }
              },
            ],
          },
        ],
      },
    optimization: {
        minimize: true,
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true
            }
          }
        },
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          // `...`,
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                "default",
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
    }),
          new TerserPlugin(),
          new ImageMinimizerPlugin({
            minimizerOptions: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                [
                  "svgo",
                  {
                    plugins: [
                      "removeTitle",
                      "removeDesc",
                      "removeUselessStrokeAndFill",
                      "removeUnusedNS",
                      "cleanupIDs",
                      "convertShapeToPath",
                      "cleanupNumericValues",
                      "removeRasterImages",
                      "removeDimensions",
                      "removeStyleElement",
                      "removeScriptElement",
                      // your previous configuration...
                      {
                        name: "preset-default",
                        params: {
                          overrides: {
                            removeViewBox: false,
                            addAttributesToSVGElement: {
                              params: {
                                attributes: [
                                  { xmlns: "http://www.w3.org/2000/svg" },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                ]
                
              ],
            },
          }),
        ],
      },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'], // Specify the chunks to include in this HTML file
        inject: true,
        favicon: './src/img/favicon.ico'
      }),
      new HtmlWebpackPlugin({
        template: './src/privacy.html',
        filename: 'privacy.html',
        chunks: ['main'], // Specify the chunks to include in this HTML file
        favicon: './src/img/favicon.ico'
      }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
        }),
        new PurgeCSSPlugin({
          paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
        }),
    ],
  };
  