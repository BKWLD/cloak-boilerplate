/*
 * Configuration related to setting up vuex
 */
import { join } from 'path'
import { existsSync } from 'fs'
export default function() {

	// Run storeInit when on spa mode if the project has an index module
	if (existsSync(join(this.options.srcDir, 'store/index.js')) ||
		existsSync(join(this.options.srcDir, 'store/index.coffee'))) {
		this.requireModule('nuxt-spa-store-init')
	}

}
