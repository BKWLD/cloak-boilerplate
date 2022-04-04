/*
 * Configure robots.txt package
 */
import { isPublicProd } from '../helpers/env'
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {

	// Create allowing robots.txt when site is live
	if (isPublicProd) {
		defaultsDeep(this.options, { robots: {
			Sitemap: `${process.env.URL}/sitemap.xml`,
			UserAgent: '*',
			Allow: '/'
		}})

	// Disallow robots from accessing
	} else {
		defaultsDeep(this.options, { robots: {
			UserAgent: '*',
			Disallow: '/'
		}})
	}

	// Register the module
	this.requireModule('@nuxtjs/robots')
}
