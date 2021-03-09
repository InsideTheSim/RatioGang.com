<template>
  <div class="layout-container flex flex-col bg-gradient-to-b from-blue-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
    <TheSiteHeader />
    <PriceStats />
    <Nuxt />
    <TheSiteFooter />
    <EasterEgg />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.layout-container {
  min-height: 100vh;
}
</style>
