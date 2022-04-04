/*
 * Add various helpers related to routing
 */
import defaultsDeep from 'lodash/defaultsDeep'
import { join } from 'path'
import { existsSync } from 'fs'
import { sortRoutes } from '@nuxt/utils'
export default function() {

	// Make the tower slug optional, so the root route will match. This also
	// adds support for slashes within Tower URIs.
	if (existsSync(join(this.options.srcDir, 'pages/_tower.vue'))) {
		this.extendRoutes(routes => {
			routes.find(route => route.name == 'tower').path = '/:tower*'
			sortRoutes(routes)
		})
	}

	// Add default anchor parser rules
	defaultsDeep(this.options, { anchorParser: {
		addBlankToExternal: true,
		internalUrls: [

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
				if (!process.env.URL) return
				const name = process.env.URL.replace(/[\-]/g, '\\$&')
				return new RegExp(`^https?:\/\/${name}\.netlify\.app`)
			})()
		],
		externalPaths: [

			// Don't client-side navigate to Netlify functions
			/^\/\.netlify/,
		]
	}})

	// Register the vue-routing-anchor-parser module
	this.requireModule('vue-routing-anchor-parser/nuxt/module')
}
