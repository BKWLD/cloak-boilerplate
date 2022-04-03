/*
 * Helpers related to invoking functions
 */

// Wait a tick then execute callback
export function defer(cb) {
	return setTimeout(cb, 0)
}

// Wait a tick then execute callback
export function wait(ms, cb) {
	return setTimeout(cb, ms)
}
