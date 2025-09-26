<template>
    <aside class="sidebar">
        <nav class="nav">
            <!-- 路由分类列表 -->
            <div v-for="category in categoryList" :key="category.key" class="nav-item"
                :class="{ active: selectedCategory === category.title }" @click="setActive(category)">
                {{ category.title || '未知分类' }}
            </div>

            <!-- 如果没有数据，显示提示 -->
            <div v-if="categoryList.length === 0" class="nav-item debug-info">
                暂无分类数据
            </div>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, computed } from 'vue';
import { virtualBuildStore, type CategoryItem } from '../VirtualBuildStore';
import { loadTreeData } from '../VirtualBuild.api';
import { virtualBuildEmitter, VirtualBuildEvents } from '../event';

const store = virtualBuildStore();

const categoryList = ref<CategoryItem[]>([]);
const selectedCategory = ref<string>('');

// 设置激活项的函数
const setActive = async (category: CategoryItem) => {
    selectedCategory.value = category.title;
    store.updateSelectedCategory(category.title, category.code);

    // 加载子分类
    await fetchSubCategories(category.code);

    // 触发刷新字段数据事件
    virtualBuildEmitter.emit(VirtualBuildEvents.RefreshFieldsData, category.code);
};

// 加载子分类
const fetchSubCategories = async (code: string) => {
    try {
        const response = await loadTreeData(code);

        // 检查数据格式
        let subCategories: CategoryItem[] = [];
        if (Array.isArray(response)) {
            subCategories = response;
        } else if (response && response.result && Array.isArray(response.result)) {
            subCategories = response.result;
        } else if (response && response.success && response.result && Array.isArray(response.result)) {
            subCategories = response.result;
        }

        store.updateCurrentSubCategories(subCategories);
    } catch (error) {
        console.error('获取子分类失败:', error);
        store.updateCurrentSubCategories([]);
    }
};

// 获取路由分类列表
const fetchCategoryList = async () => {
    try {
        // 初始加载根分类，pcode=c03
        const response = await loadTreeData('c03');

        // 检查数据格式
        let categories: CategoryItem[] = [];
        if (Array.isArray(response)) {
            categories = response;
        } else if (response && response.result && Array.isArray(response.result)) {
            categories = response.result;
        } else if (response && response.success && response.result && Array.isArray(response.result)) {
            categories = response.result;
        }

        categoryList.value = categories;
        store.updateCategoryList(categories);

        // 默认选中第一个分类
        if (categories.length > 0 && !selectedCategory.value) {
            setActive(categories[0]);
        }
    } catch (error) {
        console.error('获取分类列表失败:', error);
        categoryList.value = [];
    }
};

// 刷新处理函数
const handleRefresh = async () => {
    const currentCategory = selectedCategory.value;
    await fetchCategoryList();

    // 保持当前选中状态
    if (currentCategory) {
        const currentCat = categoryList.value.find(c => c.title === currentCategory);
        if (currentCat) {
            setActive(currentCat);
        } else if (categoryList.value.length > 0) {
            setActive(categoryList.value[0]);
        }
    }
};

onMounted(() => {
    // 获取分类列表
    fetchCategoryList();
    virtualBuildEmitter.on(VirtualBuildEvents.RefreshCategoryList, handleRefresh);
});

onBeforeUnmount(() => {
    virtualBuildEmitter.off(VirtualBuildEvents.RefreshCategoryList, handleRefresh);
});
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