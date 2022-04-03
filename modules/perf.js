/*
 * Tweaks intended for perf
 */
import { isDev } from '../helpers/build'
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {
	defaultsDeep(this.options, {

		// Extract CSS into seperate files when statically generating to reduce JS
		// cost of injecting styles and to make them more cacheable
		build: {
			extractCSS: !isDev
		},

		// Remove preloading JS and CSS to improve PageSpeed scores. This pains me
		// to do because it seems so reasonable to have enabled but this does move
		// the needle on scores.
		render: {
			resourceHints: false
		},

		// Make seperate lighter build for modern browsers
		modern: isDev ? false : 'client',
	})
};
