const merge = require("webpack-merge");
const CompressionPlugin = require('compression-webpack-plugin');

const common = require("./webpack.config.common.js");

module.exports = merge(common, {
	mode: "production",
	// Suppress hints: webpack will alway complain about our bundle.js size being too big
	performance: { hints: false },
	plugins: [
		// gzip .js files to .js.gz
		new CompressionPlugin({
			test: /\.js(\?.*)?$/i,
			algorithm: "gzip",
			compressionOptions: { level: 6 },
			minRatio: 0.8
		})		
	]
});
