import ExtractTextPlugin from 'extract-text-webpack-plugin';

module.exports = {
	entry: './src/index.js',
	output: { path:'./build', filename:'index.js' },
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('style.css', { allChunks: true }),
	],
	devtool: 'source-map',
	devServer: {
		port: process.env.PORT || 8080,
		contentBase: './src'
	}
};
