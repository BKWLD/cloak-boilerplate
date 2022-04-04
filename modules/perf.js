/*
 * Tweaks intended for perf
 */
import { isDev } from '../helpers/env'
export default function() {

	// Extract CSS into seperate files when statically generating to reduce JS
	// cost of injecting styles and to make them more cacheable
	this.options.build.extractCSS = !isDev

	// Remove preloading JS and CSS to improve PageSpeed scores. This pains me
	// to do because it seems so reasonable to have enabled but this does move
	// the needle on scores.
	this.options.render.resourceHints = false

	// Make seperate lighter build for modern browsers
	this.options.modern = isDev ? false : 'client'
}
