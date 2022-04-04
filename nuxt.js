import { join } from 'path'
import { readdirSync, lstatSync } from 'fs'
import defaultsDeep from 'lodash/defaultsDeep'
export default function() {

	// Have Nuxt transpile resources
	this.options.build.transpile.push('@cloak-app/boilerplate')

	// Expose common ENV vars
	defaultsDeep(this.options.env, {
		APP_ENV: process.env.APP_ENV || 'dev',
		URL: process.env.URL,
	})

	// Get the modules to load, requesting all by default
	const modules = this.options.cloak?.boilerplate?.modules ||
		getFilenames(join(__dirname, 'modules'))

	// Load boilerplate modules
	modules.forEach(moduleName => {
		this.requireModule(join(__dirname, `modules/${moduleName}`))
	})

	// Get the helpers to load, requesting all by default
	const helpers = this.options.cloak?.boilerplate?.helpers ||
		getFilenames(join(__dirname, 'helpers'))

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

// Get all the files in a directory
// https://stackoverflow.com/a/69929005/59160
function getFilenames(dir) {
	return readdirSync(dir).filter(file => lstatSync(`${dir}/${file}`).isFile())
}

// Required for published modules
module.exports.meta = require('./package.json')
