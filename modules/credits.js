/*
 * Add credits module when not in dev mode
 */
import { isDev } from '../helpers/env'
import { requireOnce } from '@cloak-app/utils'
export default function() {
	if (isDev) return
	requireOnce(this, '@bkwld/credits/nuxt/module')
}
