// Nuxt config
export default {

	// Load this package
	buildModules: [
		'../nuxt',
		'@cloak-app/demo-theme/nuxt',
	],

	// Cloak Settings
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
