/*
 * Configure nuxt/components
 */
import { srcHasPath } from '../utils/filesystem'
export default function() {

	// Enable nuxt/components
	this.options.components = true

	// Don't require "global" prefix on global components
	this.nuxt.hook('components:dirs', dirs => {
		if (srcHasPath(this.options, 'components/globals')) {
			dirs.push({
				path: globalDir,
				pathPrefix: false, // Make these root level components
			})
		}
	})
}
