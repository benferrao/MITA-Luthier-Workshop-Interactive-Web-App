<template>
  <!-- 
    Using a key on NuxtPage forces Vue to fully unmount and remount 
    the home page component every time you navigate back to "/",
    fixing the resize/stale-state issue on return.
  -->
  <NuxtPage :key="$route.fullPath" />
</template>
