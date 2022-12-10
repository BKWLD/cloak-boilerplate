<!-- Test of axios retrying -->

<template lang='pug'>

.axios-retry-test
	| Tried  <strong>{{type}}</strong>
	|  with  <strong>{{ code }}</strong> response
	|  <strong>{{ tries }} time(s)</strong>

</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script lang='coffee'>
import MockAdapter from 'axios-mock-adapter'
export default

	props:
		type: String
		code: Number

	data: -> tries: 0

	# Run query using mounted instead of fetch so that the tries count updates
	mounted: ->

		# Make a clean client to mock
		client = @$addAxiosRetry @$axios.create()

		# Mock response using passed in code
		mock = new MockAdapter client
		mock.onAny().reply (config) =>
			@tries++
			return [@code, {}]

		# Trigger request and ignore erros
		try await client.post '/example', query: switch @type
			when 'query' then '{ id }'
			when 'mutation' then 'mutation update() { id }'
		catch e


</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang='stylus' scoped>

.axios-retry-test
	border 1px solid currentColor
	padding 1em
	display inline-block
	margin-bottom 0.3em

</style>
