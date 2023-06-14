const path = require('path');
const glob = require("glob");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('imagemin-webpack-plugin').default;
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

var webpack = require("webpack");


const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  stats: 'verbose',
    entry: './src/main.js',
    mode: 'development',
    devServer: {
      static: "./dist",
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: "assets/[name][hash][ext][query]",
      globalObject: 'this',
      libraryTarget: 'umd',

    },
    // externals: {
    //   jquery: 'jQuery',
    // },
    externalsPresets: {
      web: true,
    },
    module: {
    //   loaders: [
    //     {
    //         test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
    //         loader: "imports-loader?this=>window"
    //     }
    // ],
        rules: [
          {
            test: /\.m?js$/, // Apply this rule to files ending in .js
            exclude: /(node_modules)/, // Do not apply to files residing in node_modules
            use: {
              loader: 'babel-loader', // Use this loader
              options: {
                presets: ['@babel/preset-env'], // transpile our ES6 to ES5
              },
            },
          },
          // { test: /jquery\.magnific-popup\.min\.js$/, loader: 'script-loader' },
          // { test: /jquery\.nice-select\.min\.js$/, loader: 'script-loader' },
          // { test: /imagesloaded\.pkgd\.min\.js$/, loader: 'script-loader' },
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
            test: /\.(svg|png|jpg|jpeg|gif)$/, // Apply rule to images (.png, .svg, .jpg, .jpeg, .gif)
            include: path.resolve(__dirname, "src"),
            type: 'asset/resource',
            generator: {
              filename: "assets/[name][hash][ext][query]",
            },
            // use: [
            //   'file-loader', // This loader resolves import/require() on a file into a url and emits the file into the output directory.
            //   {
            //     loader: 'image-webpack-loader', // Next, we use the image-webpack-loader to optimize images
            //     options: {
            //       name: '[name][hash].[ext]',
            //       esModule: false,
            //       // mozjpeg: {
            //       //   progressive: true,
            //       // },
            //       // // optipng.enabled: false will disable optipng
            //       // optipng: {
            //       //   enabled: false,
            //       // },
            //       // // pngquant: {
            //       // //   quality: [0.8, 1],
            //       // // },
            //       // gifsicle: {
            //       //   interlaced: true,
            //       //   optimizationLevel: 3,
            //       // },
            //       // // the webp option will enable WEBP
            //       // webp: {
            //       //   quality: 75,
            //       //   enabled: true,
            //       // }
            //     }
            //   },
            // ],
          },
          {
            test: /\.xml/,
            include: path.resolve(__dirname, "src"),
            type: 'asset/resource',
            
            generator: {
                filename: 'sitemap.xml',
            },
        },
        {
            test: /\.txt/,
            include: path.resolve(__dirname, "src"),
            type: 'asset/resource',
            generator: {
                filename: 'robots.txt',
            },
        },
        ],
      },
    optimization: {
      sideEffects: true,
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
          // new TerserPlugin(),
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.sharpMinify,
              options: {
                encodeOptions: {
                  // Your options for `sharp`
                  // https://sharp.pixelplumbing.com/api-output
                  jpeg: {
                    // https://sharp.pixelplumbing.com/api-output#jpeg
                    mozjpeg: true,
                    progressive: true,
                  },

                  // png by default sets the quality to 100%, which is same as lossless
                  // https://sharp.pixelplumbing.com/api-output#png
                  png: {
                    progressive: true,
                    compressionLevel: 9,
                    palette: true,

                  },
    
                  // gif does not support lossless compression at all
                  // https://sharp.pixelplumbing.com/api-output#gif
                  gif: {
                    progressive: true,
                    interFrameMaxError: 8,
                  },
                },
              },
            },
            // minimizerOptions: {
            //   implementation: ImageMinimizerPlugin.imageminMinify,
            //   plugins: [
            //     ['gifsicle', { interlaced: true }],
            //     ['jpegtran', { progressive: true }],
            //     ['pngquant', { quality: [0.65, 0.9] }],
            //     ['optipng', { optimizationLevel: 5 }],
            //     [
            //       "svgo",
            //       {
            //         plugins: [
            //           "removeTitle",
            //           "removeDesc",
            //           "removeUselessStrokeAndFill",
            //           "removeUnusedNS",
            //           "cleanupIDs",
            //           "convertShapeToPath",
            //           "cleanupNumericValues",
            //           "removeRasterImages",
            //           "removeDimensions",
            //           "removeStyleElement",
            //           "removeScriptElement",
            //           // your previous configuration...
            //           {
            //             name: "preset-default",
            //             params: {
            //               overrides: {
            //                 removeViewBox: false,
            //                 addAttributesToSVGElement: {
            //                   params: {
            //                     attributes: [
            //                       { xmlns: "http://www.w3.org/2000/svg" },
            //                     ],
            //                   },
            //                 },
            //               },
            //             },
            //           },
            //         ],
            //       },
            //     ]
                
            //   ],
            // },
          }),
        ],
      },
    plugins: [
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      // }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery', // Ensure jQuery is available in the global scope
      }),

      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'], // Specify the chunks to include in this HTML file
        inject: 'body',
        favicon: './src/img/favicon.ico'
      }),
      new HtmlWebpackPlugin({
        template: './src/privacy.html',
        filename: 'privacy.html',
        chunks: ['main'], // Specify the chunks to include in this HTML file
        inject: 'body',
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
  