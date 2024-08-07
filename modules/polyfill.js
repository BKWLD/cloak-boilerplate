/*
 * Add polyfills
 */
import defaultsDeep from 'lodash/defaultsDeep'
import { requireOnce } from '@cloak-app/utils'
export default function() {

	// Get the list of polyfill keywords
	const polyfills = this.options.cloak?.boilerplate?.polyfills || []
	if (!polyfills.length) return

	// Polyfills *not* provided by polyfill.io
	const polyfillPackages = ['objectFit']

	// Add polyfill.io polyfills
	const polyfillIoKeywords = polyfills.filter(keyword => {
		return !polyfillPackages.includes(keyword)
	})
	if (polyfillIoKeywords.length) {
		this.options.head.script.push({
			src: 'https://cdnjs.cloudflare.com/polyfill/v3/polyfill.min.js?features=' +
				polyfillIoKeywords.join('%2C'),
			hid: 'polyfill.io',
			body: true,
		})
	}

	// Add package based polyfills
	const packagePolyfills = polyfills.filter(keyword => {
		return polyfillPackages.includes(keyword)
	})
	if (packagePolyfills.length) {

		// Setup options structure
		defaultsDeep(this.options, {
			polyfill: {
				features: [],
			}
		})

		// Add objectFit polyfill
		if (packagePolyfills.includes('objectFit')) {
			this.options.polyfill.features.push({
				require: 'objectFitPolyfill',
				detect: () => document.documentElement.style.objectFit != null
			})
		}

		// Add the Nuxt Polyfill module
		requireOnce(this, 'nuxt-polyfill')
	}
}
