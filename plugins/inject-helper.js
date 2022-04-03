/*
 * Plugin template that imports a helper and injects all methods
 */
import * as helper from '@cloak-app/boilerplate/helpers/<%= options.helperName %>'
export default function({}, inject) {
	for (const [methodName, method] of Object.entries(helper)) {
		inject(methodName, method)
	}
}
