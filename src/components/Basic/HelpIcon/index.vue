<template>
    <a-tooltip :placement="placement" :overlay-style="{ maxWidth: maxWidth + 'px' }">
        <template #title>
            <div v-html="tooltipContent"></div>
        </template>
        <QuestionCircleOutlined class="help-icon" />
    </a-tooltip>
</template>

<script setup lang="ts">
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

interface Props {
    tooltipContent: string;
    placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
    maxWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
    placement: 'top',
    maxWidth: 300
});

// 定义组件名称
defineOptions({
    name: 'HelpIcon'
});
</script>

<style scoped>
.help-icon {
    color: #999;
    font-size: 14px;
    cursor: help;
    transition: color 0.2s;
    margin-left: 4px;
}

.help-icon:hover {
    color: #1890ff;
}
</style>
