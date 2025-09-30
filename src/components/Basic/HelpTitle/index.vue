<template>
    <div class="help-title-container">
        <h3 class="help-title-text">{{ title }}</h3>
        <a-tooltip :placement="placement" :overlay-style="{ maxWidth: maxWidth + 'px' }" :title="tooltipContent">
            <QuestionCircleOutlined class="help-icon" />
        </a-tooltip>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

interface Props {
    title: string;
    tooltipContent: string | string[];
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
    maxWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
    placement: 'top',
    maxWidth: 300
});

// 处理提示内容，支持字符串数组
const tooltipContent = computed(() => {
    if (Array.isArray(props.tooltipContent)) {
        return props.tooltipContent.join('<br/>');
    }
    return props.tooltipContent;
});
</script>

<style scoped>
.help-title-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.help-title-text {
    font-size: 0.9375rem;
    font-weight: 500;
    color: #333;
    margin: 0;
}

.help-icon {
    color: #999;
    font-size: 14px;
    cursor: help;
    transition: color 0.2s;
}

.help-icon:hover {
    color: #1890ff;
}
</style>
