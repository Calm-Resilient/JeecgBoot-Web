<template>
    <WelcomePage v-if="indexStyle === 0"></WelcomePage>
    <!-- <IndexChart v-if="indexStyle === 1"></IndexChart>
    <IndexDef v-if="indexStyle === 2"></IndexDef>
    <IndexBdc v-if="indexStyle == 3"></IndexBdc>
    <IndexTask v-if="indexStyle == 4"></IndexTask> -->
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import WelcomePage from './homePage/WelcomePage.vue';
const indexStyle = ref(0);
</script>
