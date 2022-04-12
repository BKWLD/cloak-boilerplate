/*
 * Add various helpers related to routing
 */
import defaultsDeep from 'lodash/defaultsDeep'
import { srcHasPath, requireOnce } from '@cloak-app/utils'
import { sortRoutes } from '@nuxt/utils'
import { nonEmpty } from '../helpers/array'
export default function() {

	// Make the tower slug optional, so the root route will match. This also
	// adds support for slashes within Tower URIs.
	if (srcHasPath(this.options, 'pages/_tower.vue')) {
		this.extendRoutes(routes => {
			routes.find(route => route.name == 'tower').path = '/:tower*'
			sortRoutes(routes)
		})
	}

	// Add default anchor parser rules
	defaultsDeep(this.options, { anchorParser: {
		addBlankToExternal: true,
	}})

	// Manually set internalUrls values because defaultsDeep doesn't replace
	// arrays when found (it replaces items by matching on the key)
	if (!this.options.anchorParser?.internalUrls) {
		this.options.anchorParser.internalUrls = nonEmpty([

			// Local dev
			/^https?:\/\/localhost:\d+/,

			// Use current URL from Netify
			(function() {
				if (!process.env.URL) return
				const url = process.env.URL.replace(/[\/\-\.]/g, '\\$&')
				return new RegExp(`^${url}`)
			})(),

			// Use Netlify subdomain URL
			(function() {
				if (!process.env.SITE_NAME) return
				const name = process.env.SITE_NAME.replace(/[\-]/g, '\\$&')
				return new RegExp(`^https?:\/\/${name}\.netlify\.app`)
			})()
		])
	}

	// Also manually set externalPaths
	if (!this.options.anchorParser?.externalPaths) {
		this.options.anchorParser.externalPaths = [

			// Don't client-side navigate to Netlify functions
			/^\/\.netlify/,
		]
	}

	// Register the vue-routing-anchor-parser module
	requireOnce(this, 'vue-routing-anchor-parser/nuxt/module')
}
