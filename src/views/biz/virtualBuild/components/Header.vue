<template>
    <header class="header">
        <div class="header-content">
            <div class="bookmark-icon">
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="#4285f4" stroke="#4285f4" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
            </div>
            <h1 class="title">虚拟建造</h1>
        </div>
    </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
.header {
    background: white;
    border-bottom: 0.0625rem solid #e8e8e8;
    padding: 0 1.5rem;
    height: 3.5rem;
    display: flex;
    align-items: center;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.bookmark-icon {
    display: flex;
    align-items: center;
}

.title {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
}
</style>