<template>
    <aside class="sidebar">
        <nav class="nav">
            <!-- 设备类型列表 -->
            <div v-for="deviceType in deviceTypeList" :key="deviceType.deviceType" class="nav-item"
                :class="{ active: selectedDeviceType === deviceType.deviceType }" @click="setActive(deviceType)">
                {{ deviceType.deviceType || '未知设备' }}
            </div>

            <!-- 如果没有数据，显示提示 -->
            <div v-if="deviceTypeList.length === 0" class="nav-item debug-info">
                暂无设备数据
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, computed } from 'vue';
import { deviceInfoStore } from '../DeviceInfoStore';
import { list } from '../BizDeviceInfo.api';
import { deviceInfoEmitter, DeviceInfoEvents } from '../event';

const store = deviceInfoStore();

const deviceTypeList = ref([]);
const selectedDeviceType = ref('');

// 设置激活项的函数
const setActive = (deviceType) => {
    selectedDeviceType.value = deviceType.deviceType;
    store.updateSelectedDeviceType(deviceType.deviceType);
    // 根据设备类型查询对应的字段数据
    fetchDeviceData(deviceType.deviceId);
};

onMounted(() => {
    // 获取设备类型列表
    fetchDeviceTypeList();
    deviceInfoEmitter.on(DeviceInfoEvents.RefreshDeviceTypeList, handleRefresh);
    deviceInfoEmitter.on(DeviceInfoEvents.RefreshCurrentDeviceData, handleRefreshCurrentDevice);
});

onBeforeUnmount(() => {
    deviceInfoEmitter.off(DeviceInfoEvents.RefreshDeviceTypeList, handleRefresh);
    deviceInfoEmitter.off(DeviceInfoEvents.RefreshCurrentDeviceData, handleRefreshCurrentDevice);
});

// 获取设备类型列表（去重后的设备类型）
const fetchDeviceTypeList = async () => {
    try {
        const response = await list();

        // 检查数据格式
        let dataArray = null;
        if (Array.isArray(response)) {
            dataArray = response;
        } else if (response && response.result && Array.isArray(response.result)) {
            dataArray = response.result;
        } else if (response && response.success && response.result && Array.isArray(response.result)) {
            dataArray = response.result;
        }

        if (dataArray && dataArray.length > 0) {
            // 按设备类型分组，获取唯一的设备类型列表
            const deviceTypeMap = new Map();
            dataArray.forEach(item => {
                if (item.deviceType && !deviceTypeMap.has(item.deviceType)) {
                    deviceTypeMap.set(item.deviceType, {
                        deviceType: item.deviceType,
                        deviceId: item.deviceId
                    });
                }
            });

            deviceTypeList.value = Array.from(deviceTypeMap.values());
            store.updateDeviceTypeList(deviceTypeList.value);

            // 默认选中第一个设备类型
            if (deviceTypeList.value.length > 0 && !selectedDeviceType.value) {
                setActive(deviceTypeList.value[0]);
            }
        }
    } catch (error) {
        console.error('获取设备类型列表失败:', error);
        deviceTypeList.value = [];
    }
};

// 根据设备ID获取设备字段数据
const fetchDeviceData = async (deviceId) => {
    try {
        const response = await list({ deviceId });

        let dataArray = null;
        if (Array.isArray(response)) {
            dataArray = response;
        } else if (response && response.result && Array.isArray(response.result)) {
            dataArray = response.result;
        } else if (response && response.success && response.result && Array.isArray(response.result)) {
            dataArray = response.result;
        }

        if (dataArray) {
            store.updateCurrentDeviceData(dataArray);
        }
    } catch (error) {
        console.error('获取设备数据失败:', error);
        store.updateCurrentDeviceData([]);
    }
};

// 保存后刷新左侧数据，但保持当前选中项
const handleRefresh = async () => {
    const currentDeviceType = selectedDeviceType.value;
    await fetchDeviceTypeList();
    if (currentDeviceType) {
        // 如果当前设备类型仍存在，保持选中
        const currentDevice = deviceTypeList.value.find(d => d.deviceType === currentDeviceType);
        if (currentDevice) {
            setActive(currentDevice);
        } else if (deviceTypeList.value.length > 0) {
            // 若当前设备类型被删除，则选中第一个
            setActive(deviceTypeList.value[0]);
        }
    }
};

// 刷新当前设备数据（保存后调用）
const handleRefreshCurrentDevice = async () => {
    if (selectedDeviceType.value) {
        // 找到当前选中的设备类型
        const currentDevice = deviceTypeList.value.find(d => d.deviceType === selectedDeviceType.value);
        if (currentDevice) {
            // 重新查询当前设备的数据
            await fetchDeviceData(currentDevice.deviceId);
        }
    }
};
</script>

<style scoped>
.sidebar {
    width: 10.5rem;
    background: white;
    border-right: 0.0625rem solid #e8e8e8;
    overflow-y: auto;
}

.nav {
    padding: 0;
}

.nav-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-bottom: 0.0625rem solid #f5f5f5;
    color: #666;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.nav-item:hover {
    background-color: #f8f9fa;
    color: #333;
}

.nav-item.active {
    background-color: #e3f2fd;
    color: #1976d2;
    border-right: 0.1875rem solid #1976d2;
}

.debug-info {
    color: #999;
    font-style: italic;
    text-align: center;
}
</style>
