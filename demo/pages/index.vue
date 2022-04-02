<!-- Demo homepage -->

<template lang='pug'>

nuxt-content(:document='page')

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
# import pageMixin from '@bkwld/cloak/mixins/page'
export default

	# mixins: [ pageMixin ]

	# Get page content
	asyncData: ({ app, params, $content }) ->
		page = await $content('demo').fetch()
		return { page }

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

h2
	margin-top 2em
	margin-bottom 0.5em

</style>
