/*
 * Add support for coffeescript
 */
import { requireOnce } from '@cloak-app/utils'
export default function() {
	requireOnce(this, 'nuxt-coffeescript-module')
}
