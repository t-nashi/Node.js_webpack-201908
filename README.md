# Node.js_webpack-201908
webpackで画像圧縮も出来るようにした


## Other Repositories
* gulp-imagemin-ver： https://github.com/t-nashi/Node.js_img-min-201904
* old-webpack-ver： https://github.com/t-nashi/Node.js_webpack-201902
<br><br><br>


## プラグイン
**▼ [Node.js_webpack-201902](https://github.com/t-nashi/Node.js_webpack-201902) からインストールされていたもの**
- `@babel/core`  
  └ ES6（ES2015/ECMAScript 2015）→ ES5

- `@babel/preset-env`  
  └ ES6（ES2015/ECMAScript 2015）→ ES5

- `autoprefixer`  
  └ ベンダープレフィックス

- `babel-loader`  
  └ ES6（ES2015/ECMAScript 2015）→ ES5

- `bootstrap`  
  └ bootstrapを利用するための基盤

- `browser-sync`  
  └ Browsersyncを利用するための基盤

- `browser-sync-webpack-plugin`  
  └ BrowsersyncをWebpackのplugin形式で扱うためのプラグイン

- `copy-webpack-plugin`  
  └ ファイルを構造を維持してコピー

- `css-loader`  
  └ cssをjsにバンドルする

- `cssnano`  
  └ postcssでminify化をするためのもの

- `eslint`  
  └ jsの構文チェック

- `eslint-loader`  
  └ eslintでjsの構文チェックするために必要なプラグイン

- `extract-text-webpack-plugin`  
  └ ビルドされたjsファイルからstyleの部分を抽出してcssファイルで出力

- `file-loader`  
  └ url-loaderのlimit時にカバー

- `jquery`  
  └ jqueryを利用するための基盤

- `node-reset-scss`  
  └ reset.css

- `node-sass`  
  └ sass-loaderを利用する上で必要

- `optimize-css-assets-webpack-plugin`  
  └ productionモードでcssのminifyを行う

- `popper.js`  
  └ bootstrap拡張？

- `postcss-loader`  
  └ css拡張？

- `sass-loader`  
  └ sassをcssに変換

- `style-loader`  
  └ STYLEタグの出力

- `url-loader`  
  └ Base64文字列として変換

- `webpack`  
  └ webpackの基本

- `webpack-cli`  
  └ webpackの基本

- `webpack-dev-server`  
  └ browser-syncと同等のもの？

**▼ 今回インストールしたもの**

- `imagemin`  
  └ 画像圧縮する際の基盤

- `imagemin-gifsicle`  
  └ gif画像圧縮用（基本はimageminとセットで使うという認識で良い？）

- `imagemin-keep-folder`  
  └ 画像圧縮前と圧縮後のディレクトリ構造を保持する（基本はimageminとセットで使うという認識で良い？）

- `imagemin-mozjpeg`  
  └ jpg画像圧縮用（基本はimageminとセットで使うという認識で良い？）

- `imagemin-pngquant`  
  └ png画像圧縮用（基本はimageminとセットで使うという認識で良い？）

- `imagemin-svgo`  
  └ svg画像圧縮用（基本はimageminとセットで使うという認識で良い？）

- `imagemin-webpack-plugin`  
  └ webpack内で画像圧縮（imagemin）するための基盤（jpegtran、pngquant、gifsicle、svgo が初期から使える。その他の圧縮は plugins 指定で設定できる）

<br><br><br>




## 参考リンク
* [超簡単！imageminで画像圧縮のタスクを作ってみる【拡張子全部乗せ2018】 | 東京上野のWeb制作会社LIG](https://liginc.co.jp/412075)
* [npm scriptsで画像圧縮を自動化した際の課題と検討事項 - LCL Engineers&#39; Blog](https://techblog.lclco.com/entry/2018/08/31/180000)
* [npm-scripts:imageminを導入してみた - Qiita](https://qiita.com/k-gen/items/79812b04593b233b1ac1)
* [Webpack4でes6/sassをcompile - Qiita](https://qiita.com/macotok/items/c4df30baf29ee4b9bc5e)
* [imagemin-webpack-plugin  -  npm](https://www.npmjs.com/package/imagemin-webpack-plugin)
<br><br><br>
