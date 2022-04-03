/*
 * Add credits module when not in dev mode
 */
import { isDev } from '../helpers/build'
export default function() {
	if (isDev) return
	this.requireModule('@bkwld/credits/nuxt/module')
}
