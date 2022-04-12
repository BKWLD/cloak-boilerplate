/*
 * Configure nuxt/components
 */
import { srcHasPath } from '@cloak-app/utils'
export default function() {

	// Enable nuxt/components
	this.options.components = true

	// Don't require "global" prefix on global components
	this.nuxt.hook('components:dirs', dirs => {
		if (srcHasPath(this.options, 'components/globals')) {
			dirs.push({
				path: '~/components/globals',
				pathPrefix: false, // Make these root level components
			})
		}
	})
}
