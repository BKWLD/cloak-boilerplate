/*
 * Plugin template that imports a helper and injects all methods
 */
import * as helper from '<%= options.helperFile %>'
export default function({}, inject) {
	for (const [methodName, method] of Object.entries(helper)) {
		inject(methodName, method)
	}
}
