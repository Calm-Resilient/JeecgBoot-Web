<template>
    <main class="main-content">
        <div class="content-header">
            <h2 class="content-title">显示设置</h2>
            <div class="last-update">上次更新时间：2025-07-01 10:00</div>
        </div>

        <div class="content-body">
            <div class="form-section">
                <div class="tabs">
                    <div class="tab active">窗口信息</div>
                </div>

                <!-- 中间字段区域 -->
                <div class="form-content">
                    <!-- 遍历已有字段 (数据库查出来的，排除自定义) -->
                    <div class="form-group" v-for="item in nonCustomItems" :key="item.id || item.remask">
                        <label class="form-label">{{ item.remask }}</label>
                        <input type="text" class="form-input" v-model="item.displayContent" />
                    </div>

                    <!-- 遍历自定义字段 (可删除) -->
                    <div class="form-group custom-field" v-for="(field, index) in customFields" :key="index">
                        <div class="custom-field-row">
                            <input type="text" class="form-input custom-title"
                                :class="{ 'error': hasFieldError(field.id, 'title'), 'shake': hasFieldError(field.id, 'title') }"
                                placeholder="字段标题" v-model="field.title" 
                                
                            />
                            <!-- 删除按钮 - 只有新字段才能删除 -->
                            <button v-if="field.isNew" type="button" class="remove-btn"
                                @click="removeCustomField(index)">
                                ✕
                            </button>
                        </div>
                        <div class="custom-field-row">
                            <input class="form-input custom-content"
                                :class="{ 'error': hasFieldError(field.id, 'content'), 'shake': hasFieldError(field.id, 'content') }"
                                placeholder="字段内容" v-model="field.content" />
                        </div>
                    </div>

                    <!-- 添加自定义按钮 -->
                    <div class="form-group">
                        <button class="add-button" @click="addCustomField">
                            <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            添加自定义信息
                        </button>
                    </div>
                </div>

                <!-- 固定在底部的按钮 -->
                <div class="form-actions">
                    <button class="btn btn-primary" @click="saveContent">保存</button>
                    <button class="btn btn-secondary" @click="cancel">取消</button>
                </div>
            </div>

            <!-- 右侧预览 -->
            <div class="info-panel">
                <h3 class="panel-title">三维卡片预览</h3>
                <div class="info-card">
                    <div class="card-title">{{ store.content[0]?.buildingType || '未命名区域' }}</div>

                    <!-- 原有字段（排除自定义） -->
                    <div class="info-row" v-for="item in nonCustomItems" :key="item.id || item.remask">
                        <span class="info-label">{{ item.remask }}</span>
                        <span class="info-value">{{ item.displayContent }}</span>
                    </div>

                    <!-- 自定义字段 -->
                    <div class="info-row" v-for="(field, index) in customFields" :key="'custom-' + index">
                        <span class="info-label">{{ field.title }}</span>
                        <span class="info-value">{{ field.content }}</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { areaInfoStore } from '@/views/biz/areaInfo/AreaInfoStore';
import { ref, watch, computed } from 'vue';
import { saveContent as apiSaveContent, queryContent } from '@/views/biz/areaInfo/AreaInfo.api';
import { areaInfoEmitter, AreaInfoEvents } from '@/views/biz/areaInfo/event';

const store = areaInfoStore();
const customFields = ref([]); // 存储自定义字段
const nonCustomItems = computed(() => store.content.filter(item => item.configType !== 'custom'));

// 查询内容数据
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

// 验证状态
const validationErrors = ref({}); // 存储验证错误信息

// 初始化：把已有的自定义字段加载到 customFields
const initCustomFields = () => {
    customFields.value = store.content
        .filter(item => item.configType === 'custom')
        .map(item => ({
            id: item.id, // 保存后端返回的真实ID
            title: item.remask,
            content: item.displayContent,
            isNew: false // 标记为已存在的字段
        }));
};

// 添加自定义字段
const addCustomField = () => {
    const newId = Date.now() + Math.random();
    customFields.value.push({
        id: newId,
        title: '',
        content: '',
        isNew: true // 标记为新字段
    });
    // 清除该字段的验证elete validationErrors.value[newId];
};

// 删除自定义字段
const removeCustomField = (index) => {
    const field = customFields.value[index];
    if (field) {
        delete validationErrors.value[field.id];
    }
    customFields.value.splice(index, 1);
};

// 验证自定义字段
const validateCustomFields = () => {
    let isValid = true;
    validationErrors.value = {};

    customFields.value.forEach(field => {
        const errors = {};
        if (!field.title || field.title.trim() === '') {
            errors.title = '不能为空';
            isValid = false;
        }
        if (!field.content || field.content.trim() === '') {
            errors.content = '不能为空';
            isValid = false;
        }

        if (Object.keys(errors).length > 0) {
            validationErrors.value[field.id] = errors;
        }
    });

    return isValid;
};

// 获取字段错误信息
const getFieldError = (fieldId, fieldType) => {
    return validationErrors.value[fieldId]?.[fieldType] || '';
};

// 检查字段是否有错误
const hasFieldError = (fieldId, fieldType) => {
    return !!validationErrors.value[fieldId]?.[fieldType];
};

// 保存操作
const saveContent = async () => {
    // 先验证自定义字段
    if (!validateCustomFields()) {
        return; // 验证失败，不执行保存
    }

    try {
        const payload = [
            ...store.content.filter(item => item.configType !== 'custom').map(item => ({ ...item })), // 原有字段
            ...customFields.value.map(field => ({
                id: field.isNew ? undefined : field.id, // 新字段不传ID，已存在字段传真实ID
                buildingType: store.content[0]?.buildingType || '',
                configType: 'custom',
                displayContent: field.content,
                remask: field.title
            }))
        ];

        console.log('发送给后端的数据:', payload);

        // 调用 API 保存
        const response = await apiSaveContent(payload);

        console.log('保存成功:', response);

        // 保存成功后，更新customFields中的ID（新字段会获得后端返回的ID）
        if (response && Array.isArray(response)) {
            const customResponseItems = response.filter(item => item.configType === 'custom');
            customFields.value.forEach(field => {
                if (field.isNew) {
                    // 为新字段找到对应的后端返回数据，更新ID
                    const matchedItem = customResponseItems.find(item =>
                        item.remask === field.title && item.displayContent === field.content
                    );
                    if (matchedItem) {
                        field.id = matchedItem.id;
                        field.isNew = false; // 标记为已存在
                    }
                }
            });
        }

        // 更新 store
        store.updateContent(payload);

        // 通知左侧列表刷新，但不改变当前路由/标签
        areaInfoEmitter.emit(AreaInfoEvents.RefreshAreaList);

        // 保留 customFields，保存后依然可以修改标题和内容
    } catch (error) {
        console.error('保存失败:', error);
    }
};

// 取消操作 - 重新查询当前区域数据
const cancel = async () => {
    try {
        // 获取当前激活的区域名称
        const currentActive = store.content[0]?.buildingType;
        if (currentActive) {
            // 直接查询当前区域的数据
            const result = await fetchContent(currentActive);
            store.updateContent(result);
        }
    } catch (error) {
        console.error('取消操作失败:', error);
    }
};

// 页面加载时初始化
initCustomFields();

// 监听左侧切换或内容刷新后，及时同步自定义字段
watch(
    () => store.content,
    () => {
        initCustomFields();
    },
    { deep: true }
);
</script>

<style scoped>
.main-content {
    flex: 1;
    background: white;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.content-header {
    padding: 1.5rem 2rem 1rem;
    border-bottom: 0.0625rem solid #f0f0f0;
}

.content-title {
    font-size: 1.125rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.5rem;
}

.last-update {
    font-size: 0.75rem;
    color: #999;
}

.content-body {
    flex: 1;
    display: flex;
    padding: 1.5rem 2rem;
    gap: 2rem;
    overflow: hidden;
}

.form-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
}

.tabs {
    display: flex;
    margin-bottom: 1.5rem;
    border-bottom: 0.0625rem solid #e8e8e8;
}

.tab {
    padding: 0.75rem 1rem;
    cursor: pointer;
    color: #666;
    border-bottom: 0.125rem solid transparent;
    transition: all 0.2s ease;
}

.tab.active {
    color: #1976d2;
    border-bottom-color: #1976d2;
}

.form-content {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(4, auto);
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-size: 0.875rem;
}

.form-input {
    width: 100%;
    max-width: 20rem;
    padding: 0.5rem 0.75rem;
    border: 0.0625rem solid #d9d9d9;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    transition: border-color 0.2s ease;
}

.form-input:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 0.125rem rgba(25, 118, 210, 0.1);
}

.add-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: transparent;
    border: 0.0625rem dashed #d9d9d9;
    border-radius: 0.25rem;
    color: #666;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
}

.add-button:hover {
    border-color: #1976d2;
    color: #1976d2;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    position: sticky;
    bottom: 0;
    background: #fff;
    padding-top: 1rem;
}

.btn {
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-primary {
    background: #1976d2;
    color: white;
}

.btn-secondary {
    background: #f5f5f5;
    color: #666;
    border: 0.0625rem solid #d9d9d9;
}

.info-panel {
    width: 18rem;
    flex-shrink: 0;
    border-left: 2px solid #e8e8e8;
    padding-left: 1rem;
}

.info-card {
    background: #f8f9fa;
    border-radius: 0.5rem;
    padding: 1rem;
}

.info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 0.0625rem solid #e8e8e8;
}

.info-row:last-child {
    border-bottom: none;
}

.custom-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.custom-field-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.custom-field-row .form-input {
    flex: 1;
    height: 2.5rem;
}

.remove-btn {
    background: transparent;
    border: none;
    color: #999;
    font-size: 1rem;
    cursor: pointer;
    padding: 0 0.5rem;
    line-height: 1;
    transition: color 0.2s ease;
}

.remove-btn:hover {
    color: #d32f2f;
}

/* 错误状态样式 */
.form-input.error {
    border-color: #ff4d4f;
    box-shadow: 0 0 0 0.125rem rgba(255, 77, 79, 0.1);
}

/* 抖动动画 */
@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translateX(-0.25rem);
    }

    20%,
    40%,
    60%,
    80% {
        transform: translateX(0.25rem);
    }
}

.form-input.shake {
    animation: shake 0.5s ease-in-out;
}
</style>
