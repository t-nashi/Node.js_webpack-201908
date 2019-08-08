const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

const paths = {
	srcDir : './src',				// 処理前
	dstDir : '../public'		// 処理後
}
const srcGlob = paths.srcDir + '/images/**/*.{jpg,png,gif,svg}';
const dstGlob = paths.dstDir + '/images/';

imagemin([srcGlob], {
	plugins: [
		imageminMozjpeg({ quality: 80 }),
		imageminPngquant({ quality: [0.65, 0.8] }),
		imageminGifsicle({
			interlaced: false,				// 
			optimizationLevel: 3,			// 1 - 3
			colors: 100								// 2 - 256
		}),
		imageminSvgo()
	],
	replaceOutputDir: output => {
		return output.replace(/images\//, dstGlob)
	}
}).then(() => {
	console.log('Images optimized');
});
