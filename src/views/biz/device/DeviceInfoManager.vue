<template>
    <div class="device-info-manager">
        <Header />
        <div class="content-wrapper">
            <Sidebar />
            <MainContent />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import MainContent from './components/MainContent.vue';
</script>

<style scoped>
.device-info-manager {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #f5f5f5;
}

.content-wrapper {
    display: flex;
    flex: 1;
    overflow: hidden;
}
</style>
