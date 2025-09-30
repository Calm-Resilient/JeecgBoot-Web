<template>
    <a-modal :open="visible" title="连接测试结果" width="800px" :footer="null" @cancel="handleCancel"
        class="test-result-modal">
        <div class="test-result">
            <div class="result-header">
                <div class="device-info">
                    <div class="device-icon">
                        <ApiOutlined />
                    </div>
                    <div class="device-details">
                        <span class="device-name">{{ deviceName }}</span>
                        <a-tag :color="isSuccess ? 'green' : 'red'" class="status-tag">
                            <CheckCircleOutlined v-if="isSuccess" />
                            <CloseCircleOutlined v-else />
                            {{ isSuccess ? '连接成功' : '连接失败' }}
                        </a-tag>
                    </div>
                </div>
                <div class="test-time">
                    <ClockCircleOutlined />
                    <span>{{ testTime }}</span>
                </div>
            </div>

            <div class="result-content">
                <div class="json-container">
                    <div class="json-header">
                        <div class="json-title">
                            <CodeOutlined />
                            <span>响应数据</span>
                        </div>
                        <div class="json-actions">
                            <a-button size="small" @click="copyResult" class="copy-btn">
                                <CopyOutlined />
                                复制
                            </a-button>
                            <a-button size="small" @click="formatJson" class="format-btn">
                                <FormatPainterOutlined />
                                格式化
                            </a-button>
                        </div>
                    </div>
                    <div class="json-content">
                        <pre class="json-text">{{ formattedResult }}</pre>
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { message } from 'ant-design-vue';
import {
    ClockCircleOutlined,
    CopyOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ApiOutlined,
    CodeOutlined,
    FormatPainterOutlined
} from '@ant-design/icons-vue';

const props = defineProps<{
    visible: boolean;
    deviceName: string;
    testResult: any;
}>();

const emit = defineEmits<{
    'update:visible': [value: boolean];
}>();

const isFormatted = ref(true);

// 格式化测试时间
const testTime = computed(() => {
    return new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
});

// 判断是否成功
const isSuccess = computed(() => {
    return props.testResult && !props.testResult.error;
});

// 格式化JSON结果
const formattedResult = computed(() => {
    if (!props.testResult) return '暂无测试结果';

    try {
        if (isFormatted.value) {
            return JSON.stringify(props.testResult, null, 2);
        } else {
            return JSON.stringify(props.testResult);
        }
    } catch (error) {
        return String(props.testResult);
    }
});

// 复制结果
const copyResult = async () => {
    try {
        await navigator.clipboard.writeText(formattedResult.value);
        message.success('已复制到剪贴板');
    } catch (error) {
        message.error('复制失败');
    }
};

// 格式化JSON
const formatJson = () => {
    isFormatted.value = !isFormatted.value;
    message.info(isFormatted.value ? '已格式化' : '已压缩');
};

// 处理取消
const handleCancel = () => {
    emit('update:visible', false);
};
</script>

<style scoped>
.test-result-modal :deep(.ant-modal-content) {
    border-radius: 12px;
    overflow: hidden;
}

.test-result-modal :deep(.ant-modal-header) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 20px 24px;
}

.test-result-modal :deep(.ant-modal-title) {
    color: white;
    font-size: 18px;
    font-weight: 600;
}

.test-result-modal :deep(.ant-modal-close) {
    color: white;
}

.test-result-modal :deep(.ant-modal-close:hover) {
    color: rgba(255, 255, 255, 0.8);
}

.test-result {
    padding: 0;
}

.result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-bottom: 1px solid #e8e8e8;
}

.device-info {
    display: flex;
    align-items: center;
    gap: 16px;
}

.device-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.device-icon :deep(.anticon) {
    font-size: 20px;
    color: white;
}

.device-details {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.device-name {
    font-size: 18px;
    font-weight: 600;
    color: #262626;
}

.status-tag {
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 12px;
}

.test-time {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #666;
    background: rgba(255, 255, 255, 0.8);
    padding: 8px 12px;
    border-radius: 6px;
}

.result-content {
    background: #f8f9fa;
    border-radius: 0;
    overflow: hidden;
}

.json-container {
    background: #fff;
}

.json-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background: #f1f3f4;
    border-bottom: 1px solid #e9ecef;
}

.json-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #495057;
}

.json-title :deep(.anticon) {
    color: #1890ff;
}

.json-actions {
    display: flex;
    gap: 8px;
}

.copy-btn,
.format-btn {
    height: 28px;
    font-size: 12px;
    border-radius: 4px;
}

.copy-btn {
    background: #52c41a;
    border-color: #52c41a;
    color: white;
}

.copy-btn:hover {
    background: #73d13d;
    border-color: #73d13d;
}

.format-btn {
    background: #1890ff;
    border-color: #1890ff;
    color: white;
}

.format-btn:hover {
    background: #40a9ff;
    border-color: #40a9ff;
}

.json-content {
    padding: 0;
    max-height: 500px;
    overflow-y: auto;
}

.json-text {
    margin: 0;
    padding: 20px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 13px;
    line-height: 1.6;
    color: #2c3e50;
    background: #fff;
    white-space: pre-wrap;
    word-break: break-word;
    border: none;
}

/* 滚动条样式 */
.json-content::-webkit-scrollbar {
    width: 8px;
}

.json-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

.json-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
}

.json-content::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

/* JSON语法高亮 */
.json-text {
    background: #fafafa;
}

/* 成功状态的特殊样式 */
.test-result.success .result-header {
    background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
}

.test-result.error .result-header {
    background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
}
</style>