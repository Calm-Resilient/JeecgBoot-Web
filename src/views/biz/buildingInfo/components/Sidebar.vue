<template>
    <aside class="sidebar">
        <nav class="nav">
            <!-- 楼栋列表 -->
            <div v-for="building in buildingList" :key="building.id" class="nav-item"
                :class="{ active: selectedBuilding?.id === building.id }" @click="setActive(building)">
                {{ building.buildingTypeText || '未知楼栋' }}
            </div>

            <!-- 如果没有数据，显示提示 -->
            <div v-if="buildingList.length === 0" class="nav-item debug-info">
                暂无楼栋数据
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
import { buildingInfoStore } from '../BuildingInfoStore';
import { list } from '../BizBuildingInfo.api';
import { buildingInfoEmitter, BuildingInfoEvents } from '../event';

const store = buildingInfoStore();

const buildingList = ref([
    {
        "id": "101525944493146112",
        "buildingType": "40",
        "totalLayer": 30,
        "builtLayer": 22,
        "designHeight": null,
        "height": null,
        "manager": null,
        "phone": null,
        "stepType": null,
        "sysOrgCode": "A03A01",
        "createTime": null,
        "updateTime": null,
        "delFlag": 0,
        "buildingTypeText": "楼7"
    },
    {
        "id": "101525944493146113",
        "buildingType": "41",
        "totalLayer": 31,
        "builtLayer": 13,
        "designHeight": null,
        "height": null,
        "manager": null,
        "phone": null,
        "stepType": null,
        "sysOrgCode": "A03A01",
        "createTime": null,
        "updateTime": null,
        "delFlag": 0,
        "buildingTypeText": "楼8"
    },
    {
        "id": "101525944493146114",
        "buildingType": "42",
        "totalLayer": 32,
        "builtLayer": 25,
        "designHeight": null,
        "height": null,
        "manager": null,
        "phone": null,
        "stepType": null,
        "sysOrgCode": "A03A01",
        "createTime": null,
        "updateTime": null,
        "delFlag": 0,
        "buildingTypeText": "楼10"
    }
]);
const selectedBuilding = ref(null);

// 设置激活项的函数
const setActive = (building) => {
    selectedBuilding.value = building;
    store.updateSelectedBuilding(building);
    store.updateCurrentBuildingData(building);
};

onMounted(() => {
    // 默认选中第一个楼栋
    if (buildingList.value.length > 0) {
        setActive(buildingList.value[0]);
    }

    // 尝试从API获取真实数据
    fetchBuildingList();
    buildingInfoEmitter.on(BuildingInfoEvents.RefreshBuildingList, handleRefresh);
});

onBeforeUnmount(() => {
    buildingInfoEmitter.off(BuildingInfoEvents.RefreshBuildingList, handleRefresh);
});

// 获取楼栋列表
const fetchBuildingList = async () => {
    try {
        const response = await list();

        // 检查数据格式：可能是直接返回数组，也可能是包装在对象中
        let dataArray = null;
        if (Array.isArray(response)) {
            // 直接返回数组
            dataArray = response;
        } else if (response && response.result && Array.isArray(response.result)) {
            // 包装在对象中
            dataArray = response.result;
        } else if (response && response.success && response.result && Array.isArray(response.result)) {
            // 标准格式
            dataArray = response.result;
        }

        if (dataArray && dataArray.length > 0) {
            // 直接使用返回的数据
            buildingList.value = dataArray;

            // 默认选中第一个楼栋
            if (buildingList.value.length > 0 && !selectedBuilding.value) {
                setActive(buildingList.value[0]);
            }
        }
    } catch (error) {
        console.error('获取楼栋列表失败:', error);
        buildingList.value = [];
    }
};

// 保存后刷新左侧数据，但保持当前选中项
const handleRefresh = async () => {
    const currentId = selectedBuilding.value?.id;
    await fetchBuildingList();
    if (currentId) {
        // 如果当前楼栋仍存在，保持选中
        const currentBuilding = buildingList.value.find(b => b.id === currentId);
        if (currentBuilding) {
            setActive(currentBuilding);
        } else if (buildingList.value.length > 0) {
            // 若当前楼栋被删除，则选中第一个
            setActive(buildingList.value[0]);
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
