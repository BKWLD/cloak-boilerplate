import { join } from 'path'
import defaultsDeep from 'lodash/defaultsDeep'
import { requireOnce, getFilenames } from '@cloak-app/utils'
import consola from 'consola'
export default function() {

	// Shorthand for referring to the options of this module
	const ownOptions = this.options.cloak?.boilerplate || {}

	// Make a consola scope
	const log = consola.withTag('@cloak-app/boilerplate')

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/boilerplate')

	// Expose common ENV vars
	defaultsDeep(this.options.env, {
		APP_ENV: process.env.APP_ENV || 'dev',
		URL: process.env.URL,
	})

	// Get the modules to load, requesting all by default
	const modules = (ownOptions.modules ||
		getFilenames(join(__dirname, 'modules')))
	.map(addMissingJsExt)
	.filter(removeExcludedFiles(ownOptions.excludedModules))
	log.info(`Adding modules ${modules.map(removeJsExt).join(', ')}`)

	// Load boilerplate modules
	modules.forEach(moduleName => {
		requireOnce(this, join(__dirname, `modules/${moduleName}`))
	})

	// Get the helpers to load, requesting all by default
	const helpers = (ownOptions.helpers ||
		getFilenames(join(__dirname, 'helpers')))
	.map(addMissingJsExt)
	.filter(removeExcludedFiles(ownOptions.excludedHelpers))
	log.info(`Adding helpers ${helpers.map(removeJsExt).join(',')}`)

	// Re-use the inject-helper to inject all methods from helper files
	helpers.forEach(helperName => {
		this.addPlugin({
			src: join(__dirname, 'plugins/inject-helper.js'),
			fileName: `cloak-boilerplate-helpers.${helperName}`,
			options: {
				helperFile: join(__dirname, 'helpers', helperName),
			}
		})
	})
}

// Remove excluded helpers and modules
function removeExcludedFiles(excluded) {
	return function(filename) {
		if (!excluded?.length) return true
		return !excluded.map(addMissingJsExt).includes(filename)
	}
}

// Add .js file exetnsiosns if missing
function addMissingJsExt(filename) {
	return filename.match(/\.js$/) ? filename : filename + '.js'
}

// Remove extensions
function removeJsExt(filename) {
	return filename.replace(/\.js$/, '')
}

// Required for published modules
module.exports.meta = require('./package.json')
