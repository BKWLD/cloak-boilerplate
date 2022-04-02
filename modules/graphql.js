/*
 * Add GraphQL Loader
 */
export default function() {
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
