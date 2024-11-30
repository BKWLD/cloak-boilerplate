# [@cloak-app/boilerplate](https://github.com/BKWLD/cloak-boilerplate)

## Axios Retrying

This component mocks the injected Axios method and simulates a requests, counting the number of attempts made. Only the failed query should be retried multiple times.

<axios-retry-test type='query' :code='200'></axios-retry-test>
<axios-retry-test type='query' :code='500'></axios-retry-test>
<axios-retry-test type='mutation' :code='200'></axios-retry-test>
<axios-retry-test type='mutation' :code='500'></axios-retry-test>
