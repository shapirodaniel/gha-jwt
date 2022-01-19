# a github actions signed jwt with expiry generator

this github actions script takes in a secret (string), payload (stringified JSON), and expiry (string) and returns an access token that can be used to authorize requests against remote services and servers.

### Example usage

```yaml
on:
  push:
    branches:
      - 'branch-that-triggers-workflow'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: generate access token
        id: generate_access_token
        uses: shapirodanieladam/gha-jwt@1.0.0
        with:
          secret: 'imasecret'
          payload: '{"jwts":"are_cool"}'
          expires_in: '5m'
      - name: curl
        run: |
          curl https://my-url.io/protected \
            -H 'Content-Type:application/json' \
            -H 'Authorization: Bearer ${{ env.ACCESS_TOKEN }} \
            -d '{"this":"is","my":"payload"}'
        env:
          ACCESS_TOKEN: ${{ steps.generate_access_token.outputs.access_token }}
```
