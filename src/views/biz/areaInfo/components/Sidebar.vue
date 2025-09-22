<template>
    <aside class="sidebar">
        <nav class="nav">
            <div v-for="item in areaType" :key="item" class="nav-item" :class="{ active: activeItem === item }"
                @click="setActive(item)">
                {{ item }}
            </div>
        </nav>
    </aside>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { areaInfoStore } from '@/views/biz/areaInfo/AreaInfoStore';
import { list, queryContent } from '../AreaInfo.api';
import { areaInfoEmitter, AreaInfoEvents } from '@/views/biz/areaInfo/event';

const store = areaInfoStore();

let areaType = ref([]);
// 使用 ref 创建响应式变量来跟踪当前激活的项
const activeItem = ref('钢筋部品工厂'); // 默认激活“钢筋加工区1”

// 设置激活项的函数
const setActive = async (item) => {
    activeItem.value = item;
    store.updateParam(item);
    const result = await fetchContent(item);
    store.updateContent(result);
};

onMounted(() => {
    fetchAreaList();
    setActive(store.paramValue || "钢筋部品工厂");
    areaInfoEmitter.on(AreaInfoEvents.RefreshAreaList, handleRefresh);
});

onBeforeUnmount(() => {
    areaInfoEmitter.off(AreaInfoEvents.RefreshAreaList, handleRefresh);
});

// ✅ 异步获取数据
const fetchAreaList = async () => {
    let data = await list();
    areaType.value = data;
};

// 保存后刷新左侧数据，但保持当前选中项
const handleRefresh = async () => {
    const current = activeItem.value;
    await fetchAreaList();
    if (current) {
        // 如果当前值仍存在，保持选中并刷新右侧内容
        if (areaType.value.includes(current)) {
            await setActive(current);
        } else if (areaType.value.length) {
            // 若当前被删除，则选中第一个
            await setActive(areaType.value[0]);
        }
    }
};

const fetchContent = (name) => {
    return queryContent({ name: name })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.error('获取内容失败:', error);
            throw error;
        });
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
</style>
