<!-- Renders a boilerplate block -->

<template lang='pug'>

section.boilerplate-block(:class='classes')
	| Heya world

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
export default

	props:

		# The max-width class
		maxWidthClass:
			type: String
			default: -> @$config.cloak?.boilerplate?.blockMaxWidthClass || ''

	computed:

		# Root classes
		classes: -> @maxWidthClass

</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped></style>
