<script lang="ts" setup>
const config = useRuntimeConfig()

console.log(config)

;(function (d, t) {
  const BASE_URL = 'https://app.chatwoot.com'
  const g = d.createElement(t) as any
  const s = d.getElementsByTagName(t)[0] as any
  g.src = BASE_URL + '/packs/js/sdk.js'
  g.defer = true
  g.async = true
  s.parentNode.insertBefore(g, s)
  g.onload = function () {
    window.chatwootSDK.run({
      websiteToken: config.CHATWOOT_WEBSITE_TOKEN,
      baseUrl: BASE_URL
    })
  }
})(document, 'script')
</script>
