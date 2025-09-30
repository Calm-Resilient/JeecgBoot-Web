<template>
    <a-modal :open="visible" title="设备详情" width="600px" :footer="null" @cancel="handleCancel"
        class="device-detail-modal">
        <div class="device-detail">
            <div class="detail-header">
                <div class="device-icon">
                    <DesktopOutlined />
                </div>
                <div class="device-title">
                    <h3>{{ deviceDetail.deviceName || '未知设备' }}</h3>
                    <p class="device-code">{{ deviceDetail.deviceCode || '-' }}</p>
                </div>
            </div>

            <div class="detail-content">
                <div class="info-section">
                    <h4 class="section-title">
                        <ApiOutlined />
                        接口配置
                    </h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">
                                <span class="label-icon">🌐</span>
                                <span class="label-text">API接口地址</span>
                            </div>
                            <div class="info-value">{{ deviceDetail.url || '-' }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                <span class="label-icon">🔒</span>
                                <span class="label-text">通信协议</span>
                            </div>
                            <div class="info-value">{{ deviceDetail.agreement || '-' }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                <span class="label-icon">📡</span>
                                <span class="label-text">请求方式</span>
                            </div>
                            <div class="info-value">{{ deviceDetail.requestType || '-' }}</div>
                        </div>
                    </div>
                </div>

                <div class="info-section">
                    <h4 class="section-title">
                        <KeyOutlined />
                        授权信息
                    </h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">
                                <span class="label-icon">🆔</span>
                                <span class="label-text">授权ID</span>
                            </div>
                            <div class="info-value">{{ deviceDetail.appId || '-' }}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">
                                <span class="label-icon">🔑</span>
                                <span class="label-text">授权密钥</span>
                            </div>
                            <div class="info-value">{{ deviceDetail.appKey || '-' }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<script setup lang="ts">
import { DesktopOutlined, ApiOutlined, KeyOutlined } from '@ant-design/icons-vue';

interface DeviceDetail {
    id?: string;
    deviceCode?: string;
    deviceName?: string;
    url?: string;
    agreement?: string;
    appId?: string;
    appKey?: string;
    requestType?: string;
    params?: any;
    port?: string;
}

defineProps<{
    visible: boolean;
    deviceDetail: DeviceDetail;
}>();

const emit = defineEmits<{
    'update:visible': [value: boolean];
}>();

// 处理取消
const handleCancel = () => {
    emit('update:visible', false);
};
</script>

<style scoped>
.device-detail-modal :deep(.ant-modal-content) {
    border-radius: 12px;
    overflow: hidden;
}

.device-detail-modal :deep(.ant-modal-header) {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 20px 24px;
}

.device-detail-modal :deep(.ant-modal-title) {
    color: white;
    font-size: 18px;
    font-weight: 600;
}

.device-detail-modal :deep(.ant-modal-close) {
    color: white;
}

.device-detail-modal :deep(.ant-modal-close:hover) {
    color: rgba(255, 255, 255, 0.8);
}

.device-detail {
    padding: 0;
}

.detail-header {
    display: flex;
    align-items: center;
    padding: 16px 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 0;
}

.device-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.device-icon :deep(.anticon) {
    font-size: 24px;
    color: white;
}

.device-title h3 {
    margin: 0 0 4px 0;
    font-size: 20px;
    font-weight: 600;
    color: #262626;
}

.device-code {
    margin: 0;
    font-size: 14px;
    color: #666;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    background: rgba(102, 126, 234, 0.1);
    padding: 4px 8px;
    border-radius: 4px;
    display: inline-block;
}

.detail-content {
    padding: 16px 20px;
}

.info-section {
    margin-bottom: 20px;
}

.info-section:last-child {
    margin-bottom: 0;
}

.section-title {
    display: flex;
    align-items: center;
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #262626;
    padding-bottom: 8px;
    border-bottom: 2px solid #f0f0f0;
}

.section-title :deep(.anticon) {
    margin-right: 8px;
    color: #1890ff;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
}

.info-item {
    display: flex;
    flex-direction: column;
    padding: 12px 16px;
    background: #fafafa;
    border-radius: 6px;
    border: 1px solid #f0f0f0;
    transition: all 0.3s ease;
}

.info-item:hover {
    background: #f5f5f5;
    border-color: #d9d9d9;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-label {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.label-icon {
    font-size: 16px;
    margin-right: 8px;
}

.label-text {
    font-size: 14px;
    color: #666;
    font-weight: 500;
}

.info-value {
    font-size: 14px;
    color: #262626;
    word-break: break-all;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    background: #fff;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    min-height: 18px;
    line-height: 1.4;
}
</style>