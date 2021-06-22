const MiniCssExtractPlugin = require("mini-css-extract-plugin");                // CSSファイル外部書き出し
const CopyPlugin = require("copy-webpack-plugin");                              // ファイルのコピー
const ImageminPlugin = require('imagemin-webpack-plugin').default;              // 画像圧縮（jpe?g|png|gif|svg）
const ImageminMozjpeg = require('imagemin-mozjpeg');                            // jpg圧縮
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');               // ブラウザ監視

// [定数] webpack の出力オプションを指定します
// 'production' か 'development' を指定
const MODE = "production";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: MODE,

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: { 'js/bundle.js': './src/index.js' },
  // ファイルの出力設定
  output: {
    path: `${__dirname}/public`,
    filename: '[name]',
  },

  module: {
    rules: [
      // ▼ js
      {
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                "@babel/preset-env",
              ],
            },
          },
        ],
      },

      // ▼ Sassファイルの読み込みとコンパイル
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          // CSSファイルを書き出すオプションを有効にする
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              // url: false,
              // true … dataURI、 false … URL参照
              url: true,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: {
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },

			// ▼ img
			{
				// 対象となるファイルの拡張子
				test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
				// test: /\.(jpe?g|png|gif|svg|ico)(\?.+)?$/, // クエリパラメータが付いていた場合でもファイルを対象にする
				use: {
					// 画像をBase64として取り込む（css-loaderのoption - url: trueと連動？）
					loader: 'url-loader',
					options: {
							// limitのbyte数以下はBase64化、以上は画像参照 ※file-loaderが必要
							limit: 8192,
							esModule: false,
							name: '[name].[ext]',
							outputPath : 'images/',
							publicPath : function(path){
								return '../images/' + path;
							}
					}
				}
			},

    ],
  },

	// プラグインの設定
  plugins: [
    // CSSファイルを外だしにするプラグイン
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
    }),

    // ファイルをコピー
    new CopyPlugin({
      patterns: [
        {// ▼ html
          context: "./src/_public-root/",
          from: "**/index.html",
          to: "./",
          globOptions: {
            dot: false, // .***のファイルは除外
            gitignore: false, // falseじゃないとエラーになる。
          },
          noErrorOnMissing: true,  // 対象ファイルが存在しなくてもエラーにしない
        },
        {// ▼ images
          context: "./src/images/",
          from: "**/**",
          to: "./images/",
          globOptions: {
            dot: false, // .***のファイルは除外
            gitignore: false, // falseじゃないとエラーになる。
            ignore: [
              "**/*.{psd}",
              "**/datauri/**", // datauri配下は除外
            ],
          },
          noErrorOnMissing: true,  // 対象ファイルが存在しなくてもエラーにしない
        },

      ],
    }),

		// 画像圧縮
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			// png圧縮設定
			pngquant: {
				quality: '65-80',
			},
			// gif圧縮設定
			gifsicle: {
				interlaced: false,				// //
				optimizationLevel: 3,			// 1 - 3
				colors: 100								// 2 - 256
			},
			// svg圧縮設定
			svgo: {
				quality: '80',
			},
			// jpg圧縮設定（mozjpeg）
			plugins: [
				ImageminMozjpeg({
					// progressive: true,
					quality: 80
				})
			]
		}),

		// browsersync設定（$ npm run webpack --watchの時に有効）
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			tunnel: false,
			server: {
				baseDir: ['./public/'],
			},
			files: [
				'./public/*'
			],

			// target,
			// open: config.open,
			// proxyUrl: config.proxyUrl,
			// watch: config.watch,
			// delay: 500,
		}),

  ],
  // // ES5(IE11等)向けの指定
  // target: ["web", "es5"],
};
