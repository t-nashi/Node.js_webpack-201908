// BootstrapのJavaScript側の機能を読み込む
// import 'bootstrap';
// import 'popper.js';

// import $ from 'jquery';	// webpack.config.js内のplugin定義でjquery読み込みをしたためこちらは不要
import additionCalculator from './modules/addition-calculator';
import taxCalculator from './modules/tax-calculator';

const item1Price = 400;
const item2Price = 600;
const totalPrice = additionCalculator(item1Price, item2Price);
const tax = 1.08;
const priceIncludeTax = taxCalculator(totalPrice, tax);

console.log(priceIncludeTax);
// $('body').html(priceIncludeTax);

// import 文を使ってstyle.cssファイルを読み込む。
// import './style.css';
// import './style.scss'; //scssの読み込み
