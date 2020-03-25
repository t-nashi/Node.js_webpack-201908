const imagemin = require('imagemin-keep-folder');
const imageminWebp = require('imagemin-webp');

const paths = {
	srcDir : './src',				// 処理前
	dstDir : '../public'		// 処理後
}
const srcGlob = paths.srcDir + '/images/**/*.{jpg,png}';
const dstGlob = paths.dstDir + '/images/';

imagemin([srcGlob], {
	plugins: [
		imageminWebp({quality: 75})
	],
	replaceOutputDir: output => {
		return output.replace(/images\//, dstGlob)
	}
}).then(() => {
	console.log('Images optimized');
});
