export default function() {

	// Add GraphQL Loader
	this.extendBuild((config, { isDev}) => {
		config.module.rules.push({
			test: /\.gql?$/,
			use: {
				loader: 'webpack-graphql-loader',
				options: {
					minify: !isDev
				}
			}
		})
	})
}
