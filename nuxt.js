import { join } from 'path'
export default function() {

	// Set default modules
	const modules = this.options.cloak?.boilerplate?.modules || [
		'axios',
		'graphql',
	]

	// Load modules
	modules.forEach(name => {
		this.requireModule(join(__dirname, `modules/${name}`))
	})
}

// Required for published modules
module.exports.meta = require('./package.json')
