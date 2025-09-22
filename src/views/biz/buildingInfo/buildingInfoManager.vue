<template>
    <div class="app">
        <Header />
        <div class="main-container">
            <Sidebar />
            <MainContent />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import MainContent from './components/MainContent.vue'




</script>

<style scoped>
.app {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.main-container {
    flex: 1;
    display: flex;
    overflow: hidden;
}
</style>
