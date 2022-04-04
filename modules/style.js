/*
 * Configure boilerplate styles
 */
import { isDev } from '../helpers/env'
import { join } from 'path'
import { existsSync } from 'fs'
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {

	// Add normalize.css
	this.options.css.push('normalize.css')

	// Add project's app.styl
	const appStyles = join(this.options.srcDir, 'assets/app.styl')
	if (existsSync(appStyles)) this.options.css.push(appStyles)

	// Add focus-visible
	this.addPlugin({ src: join(__dirname, '../plugins/focus-visible.js') })

	// Append definitions.styl everwhere
	const definitionsStyl = join(this.options.srcDir, 'assets/definitions.styl')
	if (existsSync(definitionsStyl)) {
		defaultsDeep(this.options, { styleResources: {
			stylus: definitionsStyl
		}})
	}

	// Add style-resources module
	this.requireModule('@nuxtjs/style-resources')

	// Disable cssnano's Calc transfrom, which beefs with fluid()
	defaultsDeep(this.options.build.postcss, { plugins: {
		cssnano: isDev ? false :
			{ preset: [ 'default', { calc: false } ] }
	}})

}
