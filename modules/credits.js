/*
 * Add credits module when not in dev mode
 */
import { isDev } from '../helpers/env'
export default function() {
	if (isDev) return
	this.requireModule('@bkwld/credits/nuxt/module')
}
