<template>
    <div class="main-content">
        <!-- 顶部工具栏 -->
        <div class="toolbar">
            <div class="toolbar-left">
                <h2 class="page-title">设备列表</h2>
                <span class="device-count">共计{{ totalCount }}设备</span>
            </div>
            <div class="toolbar-right">
                <a-input v-model:value="searchKeyword" placeholder="搜索设备名称" class="search-input" @change="handleSearch">
                    <template #prefix>
                        <SearchOutlined />
                    </template>
                </a-input>
            </div>
        </div>

        <!-- 设备卡片区域 -->
        <div class="device-content">
            <a-spin :spinning="loading">
                <!-- 网格视图 -->
                <div class="device-grid">
                    <div v-for="device in filteredDeviceList" :key="device.id" class="device-card">
                        <div class="card-header">
                            <h3 class="device-name">{{ device.deviceName }}</h3>
                            <a-tag :color="device.connectionStatus === '1' ? 'green' : 'red'" class="status-tag">
                                {{ device.connectionStatus === '1' ? '在线' : '离线' }}
                            </a-tag>
                        </div>
                        <div class="card-body">
                            <div class="info-item">
                                <span class="label">IP地址:</span>
                                <span class="value">{{ device.url || '未配置' }}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">协议:</span>
                                <span class="value">{{ device.agreement || 'HTTPS' }}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">设备编号</span>
                                <span class="value">{{ device.deviceCode || 'HTTPS' }}</span>
                            </div>
                        </div>
                        <div class="card-footer">
                            <a-button type="primary" size="small" @click="handleTestConnection(device)"
                                class="action-btn">
                                连接测试
                            </a-button>
                            <a-button size="small" @click="handleViewDetails(device)" class="action-btn">
                                查看详情
                            </a-button>
                        </div>
                    </div>
                </div>


                <!-- 空状态 -->
                <div v-if="!loading && filteredDeviceList.length === 0" class="empty-state">
                    <a-empty description="暂无设备数据" />
                </div>
            </a-spin>
        </div>

        <!-- 设备详情弹窗 -->
        <DeviceDetailModal v-model:visible="detailModalVisible" :device-detail="currentDeviceDetail" />

        <!-- 连接测试结果弹窗 -->
        <TestResultModal v-model:visible="testResultModalVisible"
            :device-name="currentDeviceDetail.deviceName || '未知设备'" :test-result="testResult" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
    SearchOutlined
} from '@ant-design/icons-vue';
import { interfaceStatusStore, DeviceItem } from '../InterfaceStatusStore';
import { testConnection, getDeviceDetailByCode } from '../InterfaceStatus.api';
import DeviceDetailModal from './DeviceDetailModal.vue';
import TestResultModal from './TestResultModal.vue';

const store = interfaceStatusStore();

// 响应式数据
const searchKeyword = ref('');
const detailModalVisible = ref(false);
const testResultModalVisible = ref(false);
const currentDeviceDetail = ref<DeviceItem>({} as DeviceItem);
const testResult = ref<any>(null);

// 计算属性
const loading = computed(() => store.loading);
const filteredDeviceList = computed(() => store.getFilteredDeviceList());
const totalCount = computed(() => store.currentDeviceList.length);


// 监听搜索关键词变化
watch(searchKeyword, (newValue) => {
    store.setSearchKeyword(newValue);
});

// 处理搜索
const handleSearch = () => {
    store.setSearchKeyword(searchKeyword.value);
};



// 处理连接测试
const handleTestConnection = async (device: DeviceItem) => {
    try {
        // 先设置当前设备详情
        currentDeviceDetail.value = device;

        const result = await testConnection(device.deviceCode, device.deviceType);

        // 保存测试结果并显示结果弹窗
        testResult.value = result;
        testResultModalVisible.value = true;

        // 更新设备连接状态
        const deviceList = store.currentDeviceList;
        const index = deviceList.findIndex(item => item.id === device.id);
        if (index !== -1) {
            deviceList[index].connectionStatus = '1';
            deviceList[index].lastConnectionTime = new Date().toISOString();
            deviceList[index].responseTime = result?.responseTime || 0;
            store.updateCurrentDeviceList([...deviceList]);
        }
    } catch (error: any) {
        console.error('连接测试失败:', error);
        // 先设置当前设备详情
        currentDeviceDetail.value = device;

        // 保存错误结果
        testResult.value = { error: error.message || '连接测试失败' };
        testResultModalVisible.value = true;

        // 更新设备连接状态为离线
        const deviceList = store.currentDeviceList;
        const index = deviceList.findIndex(item => item.id === device.id);
        if (index !== -1) {
            deviceList[index].connectionStatus = '0';
            deviceList[index].lastConnectionTime = new Date().toISOString();
            store.updateCurrentDeviceList([...deviceList]);
        }
    }
};

// 处理查看详情
const handleViewDetails = async (device: DeviceItem) => {
    try {
        console.log('查看详情:', device);
        // 先设置当前设备详情
        currentDeviceDetail.value = device;

        // 调用API获取详细数据
        const result = await getDeviceDetailByCode(device.deviceCode);
        if (result && result.records && result.records.length > 0) {
            currentDeviceDetail.value = { ...device, ...result.records[0] };
        }

        // 显示详情弹窗
        detailModalVisible.value = true;
    } catch (error) {
        console.error('获取设备详情失败:', error);
        // 即使API失败，也显示基本信息
        currentDeviceDetail.value = device;
        detailModalVisible.value = true;
    }
};
</script>

<style scoped>
.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    overflow: hidden;
}

.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
}

.toolbar-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.page-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #262626;
}

.device-count {
    color: #666;
    font-size: 14px;
}

.toolbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.search-input {
    width: 240px;
}



.device-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
}

.device-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
}

.device-card {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    border: 1px solid #f0f0f0;
}

.device-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.device-name {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #262626;
}

.status-tag {
    margin: 0;
}

.card-body {
    margin-bottom: 16px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
}

.info-item:last-child {
    margin-bottom: 0;
}

.label {
    color: #666;
    font-weight: 500;
}

.value {
    color: #262626;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 200px;
}

.card-footer {
    display: flex;
    gap: 8px;
}

.action-btn {
    flex: 1;
}


.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    background: #fff;
    border-radius: 8px;
}
</style>