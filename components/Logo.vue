<script lang="ts" setup>
const siteMeta = useSiteMeta()
const initials = siteMeta.name
  .split(' ')
  .map(word => word[0].toLowerCase())
  .join('')
</script>

<template>
  <nuxt-link to="/" class="flex items-center group unstyled py-4" title="Go Home">
    <NuxtImg
      :src="siteMeta.logo"
      width="80"
      height="80"
      format="jpeg"
      :alt="siteMeta.name"
      provider="cloudinary"
      style="width: 40px; height: 40px;"
      class="rounded-lg h-10 w-10 mr-3 group-hover:(h-11 w-11) transition-all"
    />
    <div aria-label="Harlan Wilton Initials" class="hidden sm:block text-gray-700 dark:text-gray-200 relative transform top-2 group-hover:top-0">
      <span class="block text-green-700 font-bold text-3xl logo">{{ initials }}</span>
      <span class="block text-green-700 font-bold text-3xl logo">{{ initials }}</span>
    </div>
  </nuxt-link>
</template>

<style lang="scss">
.group:hover {
  filter: drop-shadow(0 0 35px #11998e);
  .logo {
    background: linear-gradient(90deg, #11998e, #38ef7d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transform: translateX(0px) translateY(18px) skewX(-10deg);
  }
  .logo:nth-of-type(2) {
    filter: drop-shadow(0 0 10px #38ef7d);
    transform: translateX(0) translateY(-18px) skewX(-10deg);
  }
}
.logo {
  transform: skewX(-10deg);
  font-weight: 400;
  transition: 0.2s;
  background: linear-gradient(90deg, rgba(#11998e, 0.3), rgba(#38ef7d, 0.3));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.logo:nth-of-type(2) {
  background: linear-gradient(90deg, #38ef7d, #11998e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: translateX(-3px) translateY(-17px) skewX(-10deg);
}
</style>
