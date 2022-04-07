// Nuxt config
export default {

	// Load this package
	buildModules: [
		'../nuxt',
		'@cloak-app/demo-theme',
	],

	// Cloak Settings
	cloak: {
		boilerplate: {
			siteName: '@cloak-app/boilerplate demo',
			// polyfills: ['default']
		}
	},

	// @nuxt/content can't be loaded from module
	modules: ['@nuxt/content'],

}
