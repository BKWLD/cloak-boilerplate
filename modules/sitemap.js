/*
 * Add and configure sitemap module
 */
import defaultsDeep from 'lodash/defaultsDeep'
import { isGenerating } from '../helpers/env'
export default function() {
	if (!isGenerating) return
  if (!process.env.URL) return // Sitemap fatally errors if missing

	// Configure to load from project directory
	defaultsDeep(this.options, { sitemap: {

		// Get the hostname from Netlify
		hostname: process.env.URL,

		// Exclude all static routes, assuming everything is driven from
		// generate.routes
		exclude: ['**'],

		// This option is expected to be populated by the CMS module and contain
		// dynamic routes that had a `noindex` robots rule.  It is expecting route
		// paths like "/contact"
		noindex: [],

		// Remove routes that were added to the noindex array
		filter: ({ routes }) => {
			const noindex = this.options.sitemap.noindex
			if (!noindex.length) return routes
			return routes.filter(route => !noindex.includes(route.path))
		}
	}})

	// Register the module
	this.requireModule('@nuxtjs/sitemap')
}
