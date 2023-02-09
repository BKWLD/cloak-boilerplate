/*
 * Configure boilerplate styles
 */
import { isDev } from '../helpers/env'
import { requireLate, srcHasPath } from '@cloak-app/utils'
import { join } from 'path'
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {

	// Add normalize.css
	this.options.css.push('normalize.css')

	// Add project's app.styl
	if (srcHasPath(this.options, 'assets/app.styl')) {
		this.options.css.push('~/assets/app.styl')
	}

	// Add focus-visible
	this.addPlugin({
		src: join(__dirname, '../plugins/focus-visible.js'),
		options: {
			assetsDir: join(__dirname, '../assets'),
		}
	})

	// Append definitions.styl everwhere
	if (srcHasPath(this.options, 'assets/definitions.styl')) {
		defaultsDeep(this.options, { styleResources: { stylus: [] }})
		this.options.styleResources.stylus.push('~assets/definitions.styl')
	}

	// Add style-resources module late so other modules can append imports
	requireLate(this, '@nuxtjs/style-resources')

	// Disable cssnano's Calc transfrom, which beefs with fluid(). The `plugins`
	// property wasn't set by default, which is why I'm using defaultsDeep here.
	const postcssOptions = { plugins: {
		cssnano: isDev ? false : { preset: [ 'default', { calc: false } ] }
	}}
	if (this.options.build.postcss.postcssOptions) { // Nuxt 2.16
		defaultsDeep(this.options.build.postcss.postcssOptions, postcssOptions)
	} else { // < Nuxt 2.16
		defaultsDeep(this.options.build.postcss, postcssOptions)
	}


}
