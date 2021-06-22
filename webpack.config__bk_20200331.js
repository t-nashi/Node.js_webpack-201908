const webpack = require('webpack');																							// プラグインを利用するためにwebpackを読み込んでおく
const path = require('path');																										// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const TerserPlugin = require('terser-webpack-plugin');													// optimization.minimizerを上書きするために必要なプラグイン
const ExtractTextPlugin = require('extract-text-webpack-plugin');								// （便利な拡張機能？）
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');								// ブラウザ監視
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");	// CSS の minify を行う
const CopyWebpackPlugin = require('copy-webpack-plugin');												// ファイルを構造を維持してコピー
const ImageminPlugin = require('imagemin-webpack-plugin').default;							// 画像圧縮（jpe?g|png|gif|svg）
const ImageminMozjpeg = require('imagemin-mozjpeg');														// jpg圧縮
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");

	// "imagemin-webp": "^5.1.0",
	// "imagemin-webp-webpack-plugin": "^3.3.1",

module.exports = {
	// webpack4以降はモード指定しなければいけない（production | development | none）
	mode: 'development',

	// watchモードを有効にする（ファイルを監視して変更があったらビルドを再実行する機能 - 「webpack --watch」でもok）
	// watch: true,

	// エントリーポイント（モジュール間の依存関係の解析を開始する地点）
	entry: {
		'js/bundle.js': './src/js/app.js',
		'css/style.css': './src/scss/app.scss'
	},

	// 出力設定
	output: {
		// publicPath: '/',															// ブラウザからバンドルにアクセスする際のパス
		path: path.join(__dirname, 'public'),						// 出力先のパス（絶対パスを指定する必要がある）
		filename: '[name]'															// バンドルのファイル名。[name]の部分にはentryで指定したキーが入る
		// library: ['com', 'example'],									// パッケージ名を配列で表現する
		// libraryTarget: 'umd'
	},

	// developmentモードで有効になるdevtool（https://t-hiroyoshi.github.io/webpack-devtool/）
	// バンドル前の元ソースが何かわかる（Chrome開発者ツールの「Source」タブ - 「webpack://配下にオリジナルソースが表示される ）
	devtool: 'source-map',

	// productionモードで有効になるoptimization.minimizerを上書きする
	optimization: {
		minimizer: [
			// JavaScript の minify を行う
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true												// console記述を無くす
					}
				}
			}),
			// CSS の minify を行う
			new OptimizeCSSAssetsPlugin()
		]
	},

	// ローダーの設定
	module: {
		rules: [
			// js
			{
				// ローダーの処理対象ファイル
				test: /\.js$/,
				// ローダーの処理対象から外すディレクトリ
				exclude: /node_modules/,
				use: [
					{
						// 利用するローダー
						loader: 'babel-loader',
						options: {
							presets: [[
								'@babel/preset-env',
								{
									modules: false
								}
							]]
						}
					}
				]
			},
			// scss
			{
				test: /\.scss$/, // 対象となるファイルの拡張子
				use: ExtractTextPlugin.extract({
					use: [ // 処理を後ろから順に適用

						// linkタグに出力する機能
						// 'style-loader',

						// CSSをバンドルするための機能
						{
							loader: 'css-loader',
							options: {
								url: true,							// true … dataURI、 false … URL参照
								sourceMap: true,				// ソースマップの利用有無

								// 0 => no loaders (default);
								// 1 => postcss-loader;
								// 2 => postcss-loader, sass-loader
								importLoaders: 2
							},
						},

						// PostCSSのための設定
						{
							loader: 'postcss-loader',
							options: {
								// PostCSS側でもソースマップを有効にする
								sourceMap: true,
								plugins: [
									// cssのminify化（minify）
									// require('cssnano')({
									// 	preset: 'default',
									// }),

									// Autoprefixerを有効化、ベンダープレフィックスを自動付与する
									require('autoprefixer')({
										grid: true
										// browsers: ['IE 11', 'last 2 versions']
									})
								]
							},
						},

						// Sassをバンドルするための機能
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,				// ソースマップの利用有無
							}
						}
					]
				}),
			},
			// img
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

			// eslint-loaderで構文チェックする際に有効（.eslintrcが設定ファイル）
			// {
			// 	// enforce: 'pre'を指定することによって
			// 	// enforce: 'pre'がついていないローダーより早く処理が実行される
			// 	// 今回はbabel-loaderで変換する前にコードを検証したいため、指定が必要
			// 	enforce: 'pre',
			// 	test: /\.js$/,
			// 	exclude: /node_modules/,
			// 	loader: 'eslint-loader'
			// }
		]
	},

	// webpack-dev-server用設定（browsersyncがあれば別に用無し？）
	devServer: {
		open: true,																			// ブラウザを自動で開く
		openPage: 'index.html',													// 自動で指定したページを開く
		contentBase: path.join(__dirname, 'public'),		// HTML等コンテンツのルートディレクトリ
		watchContentBase: true,													// コンテンツの変更監視をする
		port: 3000,																			// ポート番号
	},

	// プラグインの設定
	plugins: [

		new ExtractTextPlugin('[name]'),
		// new CopyWebpackPlugin([{from: './public'}]),
		// ファイルを構造を維持してコピー
		// └ src/images内
		new CopyWebpackPlugin(
			[{
				from: '',
				to: 'images/',
				ignore: [
					// '*.{jpg,png,gif,svg,psd}',
					'*.{psd}',
					'datauri/**/*'
				]
			}],
			{ context: 'src/images' }
		),
		// └ src/_public-root内（編集対象ファイルをsrcに集約させるための処置）
		new CopyWebpackPlugin(
			[{
				from: '',
				to: '',
				ignore: [
					//'!*.html'
					'*.{html}',
					'!index.html'
				]
			}],
			{ context: 'src/_public-root' }
		),
		// └ public/css内のstyle.cssを特定の場所へコピー（最終的なファイルを任意の場所にコピーしたいときの例）
		// new CopyWebpackPlugin(
		// 	[{
		// 		from: '',
		// 		to: '../../public/wp-content/themes/tech/',
		// 		ignore: [
		// 			'!style.css'
		// 		]
		// 	}],
		// 	{ context: 'public/css' }
		// ),

		// // webp画像作成
		// new ImageminWebpWebpackPlugin({
		// 	config: [{
		// 		test: /\.(jpe?g|png)$/i,
		// 		options: {
		// 			quality:  75
		// 		}
		// 	}],
		// 	overrideExtension: true,
		// 	detailedLogs: false,
		// 	silent: false,
		// 	strict: true
		// }),

		// 画像圧縮
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			// jpegtran: {
			// 	quality: '80',
			// },
			// png圧縮設定
			pngquant: {
				quality: '65-80',
			},
			// gif圧縮設定
			gifsicle: {
				interlaced: false,				// 
				optimizationLevel: 3,			// 1 - 3
				colors: 100								// 2 - 256
			},
			// svg圧縮設定
			svgo: {
				quality: '80',
			},
			// jpgは圧縮率の高いmozjpegで圧縮
			plugins: [
				ImageminMozjpeg({
					// progressive: true,
					quality: 80
				})
			]
		}),
			// options.optipng
				// type: Object or null default: { optimizationLevel: 3 }
				// Passes the given object to imagemin-optipng. Set to null to disable optipng.

			// options.gifsicle
				// type: Object or null default: { optimizationLevel: 1 }
				// Passes the given object to imagemin-gifsicle. Set to null to disable gifsicle.

			// options.jpegtran
				// type: Object or null default: { progressive: false }
				// Passes the given object to imagemin-jpegtran. Set to null to disable jpegtran.

			// options.svgo
				// type: Object or null default: {}
				// Passes the given object to imagemin-svgo. Set to null to disable svgo.

			// options.pngquant
				// type: Object or null default: null
				// Passes the given object to imagemin-pngquant. Disabled by default.

			// options.plugins
				// type: Array default: []

		// jQueryをjsファイルにバンドルする（app.jsでも読み込み設定可能）
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	jQuery: 'jquery',
		// 	'window.jQuery': 'jquery'
		// }),

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
		})
	]

};
