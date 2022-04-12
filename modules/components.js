/*
 * Configure nuxt/components
 */
import { srcHasPath } from '@cloak-app/utils'
export default function() {

	// Enable nuxt/components
	this.options.components = true

	// Customize auto-importing with cloak conventions
	this.nuxt.hook('components:dirs', dirs => {

		// Don't require "global" prefix on global components
		if (srcHasPath(this.options, 'components/globals')) {
			dirs.push('~/components/globals')
		}

		// Don't require "pages" prefix on page sub components
		if (srcHasPath(this.options, 'components/pages')) {
			dirs.push('~/components/pages')
		}
	})
}
