/*
 * Configure nuxt/components
 */
import { join } from 'path'
import { existsSync } from 'fs'
export default function() {

	// Enable nuxt/components
	this.options.components = true

	// Don't require "global" prefix on global components
	this.nuxt.hook('components:dirs', dirs => {
		const globalDir = join(this.options.srcDir, 'components/globals')
		if (existsSync(globalDir)) {
			dirs.push({
				path: globalDir,
				pathPrefix: false, // Make these root level components
			})
		}
	})
}
