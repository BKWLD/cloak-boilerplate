/*
 * Add credits module when not in dev mode
 */
import { isDev } from '../utils/env'
export default function() {
	if (isDev) return
	this.requireModule('@bkwld/credits/nuxt/module')
}
