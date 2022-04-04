/*
 * Utils for interacting with the filsystem in @cloak-app/boilerplate
 */
import { join } from 'path'
import { existsSync } from 'fs'

// Check if the src directory has a path.  Use like:
// srcHasFile("store/index.js")
export function srcHasPath(options, paths) {
	if (!Array.isArray(paths)) paths = [ paths ]
	return paths.find(path => {
		return existsSync(join(options.srcDir, path))
	})
}
