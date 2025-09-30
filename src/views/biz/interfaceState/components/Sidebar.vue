<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <h3 class="sidebar-title">设备</h3>
        </div>
        <div class="sidebar-content">
            <a-menu v-model:selectedKeys="selectedKeys" mode="inline" :inline-collapsed="false" class="device-menu"
                @click="handleMenuClick">
                <a-menu-item key="all">
                    <template #icon>
                        <AppstoreOutlined />
                    </template>
                    全部
                </a-menu-item>
                <a-menu-item v-for="deviceType in deviceTypeList" :key="deviceType.value" :title="deviceType.text">
                    <template #icon>
                        <DesktopOutlined />
                    </template>
                    {{ deviceType.text }}
                </a-menu-item>
            </a-menu>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { AppstoreOutlined, DesktopOutlined } from '@ant-design/icons-vue';
import { initDictOptions } from '/@/utils/dict';
import { interfaceStatusStore } from '../InterfaceStatusStore';

const store = interfaceStatusStore();

const selectedKeys = ref<string[]>(['all']);

// 获取设备类型列表
const deviceTypeList = computed(() => store.deviceTypeList);

// 加载设备类型字典
const loadDeviceTypes = async () => {
    try {
        const deviceTypes = await initDictOptions('device_type');
        store.updateDeviceTypeList(deviceTypes || []);
    } catch (error) {
        console.error('加载设备类型失败:', error);
    }
};

// 处理菜单点击
const handleMenuClick = ({ key }) => {
    selectedKeys.value = [key];

    if (key === 'all') {
        store.updateSelectedDeviceType('', '全部');
        store.loadDeviceList(); // 加载所有设备
    } else {
        const deviceType = deviceTypeList.value.find(item => item.value === key);
        if (deviceType) {
            store.updateSelectedDeviceType(deviceType.value, deviceType.text);
            store.loadDeviceList(deviceType.value);
        }
    }
};


onMounted(async () => {
    await loadDeviceTypes();
    // 页面加载时默认选中"全部"并加载所有设备
    handleMenuClick({ key: 'all' });
});
</script>

<style scoped>
.sidebar {
    width: 240px;
    background: #fff;
    border-right: 1px solid #e8e8e8;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.sidebar-header {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
}

.sidebar-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #262626;
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
}

.device-menu {
    border: none;
    background: transparent;
}

.device-menu :deep(.ant-menu-item) {
    margin: 0;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    border-radius: 0;
}

.device-menu :deep(.ant-menu-item-selected) {
    background-color: #e6f7ff;
    color: #1890ff;
}

.device-menu :deep(.ant-menu-item:hover) {
    background-color: #f5f5f5;
}
</style>