# Node.js_webpack-201908
webpackで画像圧縮も出来るようにした

<br><br><br>


## 何が出来るのか・何が実行されるか
* sass（SCSS記法）をcssへ変換＆バンドル（src/scss/ → public/css）
* js の ES6（ES2015 | ECMAScript2015）を ES5 へ変換（Babelでトランスパイラ）＆バンドル（src/js/ → public/js）
* 画像を圧縮（jpg|jpeg|png|gif|svg）（src/images/ → public/images）
* 「src/images/datauri」内の8kb以下の参照されてる画像はbase64（data-uri）として参照先のファイル内にコード記述される
* 「src/_public-root/index.html → public/index.html」コピー
* **npm run watch** で↑ 上記の内容を実行 ＆ srcフォルダ監視 ＆ browser-syncでpublicフォルダ内のindex.htmlをブラウザでリアルタイム表示
* **npm run build** で↑ 上記の内容を実行（jsとcssファイルはminify化）
* **npm run imagemin** で画像を圧縮（jpg|jpeg|png|gif|svg）（src/images/ → public/images）
* CSS設計|構成案は [FLOCSS](https://github.com/hiloki/flocss) を採用したsassサンプルを用意
* └【命名規則・コーディング規則】
* └ MindBEMding … BEMシステムのシンタックスである、Block、Element、Modifierに分類して構成される規則を採用
* └ ケバブケース（チェインケース）を基本とする ※MindBEMdingで一部スネークケースを使用
* └ カラーコードは大文字、省略可能な時は省略する
* └ インデントスペースはタブを使用（半角スペース2つ分で表示させるのが理想）
* └ marginで左右、もしくは上下に余白が必要な際は要素に対して「左・上」を基準とする

<br><br><br>


## コマンド一覧
* **npm run watch**
* **npm run build**
* **npm run imagemin**

<br><br><br>






## 使用プラグイン
**▼ [Node.js_webpack-201902](https://github.com/t-nashi/Node.js_webpack-201902) からインストールされていたもの**
<table>
	<tr>
		<td><b>@babel/core</b></td>
		<td>ES6（ES2015/ECMAScript 2015）→ ES5</td>
	</tr>
	<tr>
		<td><b>@babel/preset-env</b></td>
		<td>ES6（ES2015/ECMAScript 2015）→ ES5</td>
	</tr>
	<tr>
		<td><b>autoprefixer</b></td>
		<td>ベンダープレフィックス</td>
	</tr>
	<tr>
		<td><b>babel-loader</b></td>
		<td>ES6（ES2015/ECMAScript 2015）→ ES5</td>
	</tr>
	<tr>
		<td><b>bootstrap</b></td>
		<td>bootstrapを利用するための基盤</td>
	</tr>
	<tr>
		<td><b>browser-sync</b></td>
		<td>Browsersyncを利用するための基盤</td>
	</tr>
	<tr>
		<td><b>browser-sync-webpack-plugin</b></td>
		<td>BrowsersyncをWebpackのplugin形式で扱うためのプラグイン</td>
	</tr>
	<tr>
		<td><b>copy-webpack-plugin</b></td>
		<td>ファイルを構造を維持してコピー</td>
	</tr>
	<tr>
		<td><b>css-loader</b></td>
		<td>cssをjsにバンドルする</td>
	</tr>
	<tr>
		<td><b>cssnano</b></td>
		<td>postcssでminify化をするためのもの</td>
	</tr>
	<tr>
		<td><b>eslint</b></td>
		<td>jsの構文チェック</td>
	</tr>
	<tr>
		<td><b>eslint-loader</b></td>
		<td>eslintでjsの構文チェックするために必要なプラグイン</td>
	</tr>
	<tr>
		<td><b>extract-text-webpack-plugin</b></td>
		<td>ビルドされたjsファイルからstyleの部分を抽出してcssファイルで出力</td>
	</tr>
	<tr>
		<td><b>file-loader</b></td>
		<td>url-loaderのlimit時にカバー</td>
	</tr>
	<tr>
		<td><b>jquery</b></td>
		<td>jqueryを利用するための基盤</td>
	</tr>
	<tr>
		<td><b>node-reset-sc</b></td>  
		<td>reset.css</td>
	</tr>
	<tr>
		<td><b>node-sass</b></td>
		<td>sass-loaderを利用する上で必要</td>
	</tr>
	<tr>
		<td><b>optimize-css-assets-webpack-plugin</b></td>
		<td>productionモードでcssのminifyを行う</td>
	</tr>
	<tr>
		<td><b>popper.js</b></td>
		<td>Bootstrap4から追加された依存ライブラリ</td>
	</tr>
	<tr>
		<td><b>postcss-load</b></td>  
		<td>css拡張？</td>
	</tr>
	<tr>
		<td><b>sass-loader</b></td>
		<td>sassをcssに変換</td>
	</tr>
	<tr>
		<td><b>style-loader</b></td>
		<td>STYLEタグの出力</td>
	</tr>
	<tr>
		<td><b>url-loader</b></td>
		<td>Base64文字列として変換</td>
	</tr>
	<tr>
		<td><b>webpack</b></td>
		<td>webpackの基本</td>
	</tr>
	<tr>
		<td><b>webpack-cli</b></td>
		<td>webpackの基本</td>
	</tr>
	<tr>
		<td><b>webpack-dev-server</b></td>
		<td>browser-syncと同等のもの？</td>
	</tr>
</table>

<br>

**▼ 今回インストールしたもの**
<table>
	<tr>
		<td><b>imagemin</b></td>
		<td>画像圧縮する際の基盤</td>
	</tr>
	<tr>
		<td><b>imagemin-gifsicle</b></td>
		<td>gif画像圧縮用</td>
	</tr>
	<tr>
		<td><b>imagemin-keep-folder</b></td>
		<td>画像圧縮前と圧縮後のディレクトリ構造を保持する</td>
	</tr>
	<tr>
		<td><b>imagemin-mozjpeg</b></td>
		<td>jpg画像圧縮用</td>
	</tr>
	<tr>
		<td><b>imagemin-pngquant</b></td>
		<td>png画像圧縮用</td>
	</tr>
	<tr>
		<td><b>imagemin-svgo</b></td>
		<td>svg画像圧縮用</td>
	</tr>
	<tr>
		<td><b>imagemin-webpack-plugin</b></td>
		<td>
			webpack内で画像圧縮（imagemin）するための基盤<br>
			（jpegtran、pngquant、gifsicle、svgo が初期から使える。その他の圧縮は plugins 指定で設定できる）
		</td>
	</tr>
</table>

<br><br><br>



## Other Repositories
* gulp-imagemin-ver： https://github.com/t-nashi/Node.js_img-min-201904
* old-webpack-ver： https://github.com/t-nashi/Node.js_webpack-201902
<br><br><br>



## 参考リンク
* [超簡単！imageminで画像圧縮のタスクを作ってみる【拡張子全部乗せ2018】 | 東京上野のWeb制作会社LIG](https://liginc.co.jp/412075)
* [npm scriptsで画像圧縮を自動化した際の課題と検討事項 - LCL Engineers&#39; Blog](https://techblog.lclco.com/entry/2018/08/31/180000)
* [npm-scripts:imageminを導入してみた - Qiita](https://qiita.com/k-gen/items/79812b04593b233b1ac1)
* [Webpack4でes6/sassをcompile - Qiita](https://qiita.com/macotok/items/c4df30baf29ee4b9bc5e)
* [imagemin-webpack-plugin  -  npm](https://www.npmjs.com/package/imagemin-webpack-plugin)
<br><br><br>
