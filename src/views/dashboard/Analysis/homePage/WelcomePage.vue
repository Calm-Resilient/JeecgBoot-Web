<template>
    <div class="welcome-container">
        <!-- 主标题区域 -->
        <div class="hero-section">
            <div class="hero-content">
                <div class="main-title">
                    <h1 class="platform-title">工地数字地图管理平台</h1>
                    <p class="platform-subtitle">智慧工地 · 数字化管理</p>
                </div>
                <div class="hero-image">
                    <div class="construction-icon">
                        <svg viewBox="0 0 200 200" class="construction-svg">
                            <!-- 工地塔吊 -->
                            <g class="crane">
                                <rect x="90" y="20" width="20" height="120" fill="#2c5aa0" rx="2" />
                                <rect x="60" y="20" width="80" height="8" fill="#2c5aa0" rx="2" />
                                <rect x="70" y="28" width="60" height="6" fill="#2c5aa0" rx="2" />
                                <circle cx="100" cy="50" r="3" fill="#ff6b35" />
                                <rect x="95" y="53" width="10" height="40" fill="#666" rx="1" />
                                <rect x="85" y="90" width="30" height="4" fill="#666" rx="1" />
                            </g>
                            <!-- 建筑物 -->
                            <g class="buildings">
                                <rect x="30" y="120" width="25" height="60" fill="#8b4513" rx="2" />
                                <rect x="35" y="100" width="15" height="20" fill="#8b4513" rx="1" />
                                <rect x="145" y="140" width="30" height="40" fill="#8b4513" rx="2" />
                                <rect x="150" y="120" width="20" height="20" fill="#8b4513" rx="1" />
                            </g>
                            <!-- 地图网格 -->
                            <g class="map-grid" opacity="0.3">
                                <defs>
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2c5aa0" stroke-width="1" />
                                    </pattern>
                                </defs>
                                <rect width="200" height="200" fill="url(#grid)" />
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less" scoped>
.welcome-container {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 0;
    overflow: hidden;
}

.hero-section {
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        opacity: 0.3;
    }
}

.hero-content {
    max-width: 1200px;
    width: 100%;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    gap: 60px;
}

.main-title {
    text-align: left;

    .platform-title {
        font-size: 3.5rem;
        font-weight: 700;
        margin: 0 0 20px 0;
        background: linear-gradient(45deg, #fff, #e6f3ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.2;
    }

    .platform-subtitle {
        font-size: 1.3rem;
        opacity: 0.9;
        margin: 0;
        font-weight: 300;
    }
}

.hero-image {
    display: flex;
    justify-content: center;
    align-items: center;
}

.construction-icon {
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    animation: float 6s ease-in-out infinite;
}

.construction-svg {
    width: 200px;
    height: 200px;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }
}


// 响应式设计
@media (max-width: 768px) {
    .hero-content {
        flex-direction: column;
        text-align: center;
        padding: 0 20px;
    }

    .main-title {
        text-align: center;
        margin-bottom: 40px;

        .platform-title {
            font-size: 2.5rem;
        }

        .platform-subtitle {
            font-size: 1.1rem;
        }
    }

    .construction-icon {
        width: 250px;
        height: 250px;
    }

    .construction-svg {
        width: 150px;
        height: 150px;
    }
}

@media (max-width: 480px) {
    .hero-content {
        padding: 0 15px;
    }

    .main-title .platform-title {
        font-size: 2rem;
    }

    .construction-icon {
        width: 200px;
        height: 200px;
    }

    .construction-svg {
        width: 120px;
        height: 120px;
    }
}
</style>
