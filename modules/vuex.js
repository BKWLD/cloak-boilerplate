/*
 * Configuration related to setting up vuex
 */
import { srcHasPath } from '@cloak-app/utils'
export default function() {

	// Run storeInit when on spa mode if the project has an index module
	if (srcHasPath(this.options, [
		'store/index.js',
		'store/index.coffee',
	])) {
		this.requireModule('nuxt-spa-store-init')
	}

}
