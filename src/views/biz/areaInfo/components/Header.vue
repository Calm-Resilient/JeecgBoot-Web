<template>
  <header class="header">
    <div class="header-content">
<!--      <div class="back-button">-->
<!--        <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">-->
<!--          <path d="M19 12H5M12 19l-7-7 7-7"/>-->
<!--        </svg>-->
<!--      </div>-->
      <div class="bookmark-icon">
        <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="#4285f4" stroke="#4285f4" stroke-width="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <h1 class="title">总平区域</h1>
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

.back-button {
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.back-button:hover {
  color: #4285f4;
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
