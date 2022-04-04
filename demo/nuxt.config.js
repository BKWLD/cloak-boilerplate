// Nuxt config
export default {

	// Load this package
	buildModules: ['@cloak-app/boilerplate/nuxt'],

	// Example settings
	cloak: {
		boilerplate: {
			siteName: '@cloak-app/boilerplate demo',
			// polyfills: ['default']
		}
	},

	// Load CMS module
	modules: ['@nuxt/content'],

	// @nuxt/content config
	content: {
		liveEdit: false
	},
}
