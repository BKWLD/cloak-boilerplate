// Use Cloak to make boilerplate
import { mergeConfig, makeBoilerplate } from '@bkwld/cloak'
const boilerplate = makeBoilerplate({
	siteName: '@cloak-app/boilerplate demo',
	cms: '@nuxt/content',
})

// Nuxt config
export default mergeConfig(boilerplate, {

	// Load this package
	buildModules: ['@cloak-app/boilerplate/nuxt'],

	// Example settings
	cloak: {
		boilerplate: {
			blockMaxWidthClass: 'max-w',
		}
	},

	// Load CMS module
	modules: ['@nuxt/content'],

	// @nuxt/content config
	content: {
		liveEdit: false
	},

	// Enable dev tools in prod
	vue: {
		config: {
			productionTip: false,
			devtools: true
		}
	},
})
