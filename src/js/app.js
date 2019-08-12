// ==========================================================================
// ライブラリのインポート
// ==========================================================================
// import 'bootstrap';		// app.js内と一緒に読み込み
// import 'popper.js';
// import $ from 'jquery';	// webpack.config.js内のplugin定義でjquery読み込みでもok


// ==========================================================================
// 外部js活用例
// ==========================================================================

// 外部jsインポート
import additionCalculator from './modules/addition-calculator';
import taxCalculator from './modules/tax-calculator';

// 外部js関数活用例
const item1Price = 400;
const item2Price = 600;
const totalPrice = additionCalculator(item1Price, item2Price);
const tax = 1.08;
const priceIncludeTax = taxCalculator(totalPrice, tax);

console.log(priceIncludeTax);


// ==========================================================================
// メモ（テスト用など。削除ok）
// ==========================================================================

// jQueryテスト
// $('body').html(priceIncludeTax);

// ページ読み込み後の処理
// window.onload = function(){
	// console.log(document.getElementById('content-side'));
	// const test = $('#content-side').innerText;
	// console.log(test);
// }

// jsファイルにcssファイル記述もバンドル（現在cssはcssでバンドル設定中）
// import 文を使ってstyle.cssファイルを読み込む。
// import './style.css';
// import './style.scss'; //scssの読み込み
