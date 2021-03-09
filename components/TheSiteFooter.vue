<template>
  <div class="the-site-footer container p-4 text-center">
    <p class="text-gray-700 text-sm pb-4 dark:text-gray-400">
      Want to talk about it? Join us in <a class="text-blue-500" href="https://reddit.com/r/ethfinance" rel="noopener" target="_blank">r/ethfinance</a>.<br>
      <span class="text-xs text-gray-400 dark:text-gray-600"><span class="mr-2">🐊 </span> kroko says "hi"</span>
    </p>
    <p class="text-gray-700 text-sm py-8 dark:text-gray-400">
      🍻 <strong class="ml-1">Tip Jar:</strong> ratiogang.eth<br>
      <code class="text-xs">0xAf8FBF59e221D27b55DC3ADc2366F9230bCf5096</code><br>
      <span class="text-xs">All proceeds are converted directly to alcohol until the ratio improves 🙏</span>
    </p>
    <p class="text-gray-600 text-sm dark:text-gray-500">
      &copy; {{ year }} - <a href="https://www.reddit.com/user/InsideTheSimulation" target="_blank" ref="nofollow, noopener">u/InsideTheSimulation</a> | <a href="https://twitter.com/InsideTheSim" target="_blank" ref="nofollow, noopener">@insideTheSim</a>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style>

</style>
