<template>
    <main class="main-content">
        <div class="content-header">
            <h2 class="content-title">{{ currentBuilding?.buildingTypeText || '未选择楼栋' }}</h2>
            <div class="last-update">上次更新时间：{{ formatUpdateTime(currentBuilding?.updateTime) }}</div>
        </div>

        <div class="content-body">
            <div class="form-section">
                <!-- 施工进度表单 -->
                <div class="form-content">
                    <!-- 设计楼层 -->
                    <div class="form-group">
                        <label class="form-label">设计楼层</label>
                        <div class="input-with-unit">
                            <input type="number" class="form-input" v-model="formData.totalLayer" />
                            <span class="unit">层</span>
                        </div>
                    </div>

                    <!-- 设计高度 -->
                    <div class="form-group">
                        <label class="form-label">设计高度</label>
                        <div class="input-with-unit">
                            <input type="number" class="form-input" v-model="formData.designHeight" step="0.1" />
                            <span class="unit">米</span>
                        </div>
                    </div>

                    <!-- 施工楼层 -->
                    <div class="form-group">
                        <label class="form-label">施工楼层</label>
                        <div class="input-with-unit">
                            <input type="number" class="form-input" v-model="formData.builtLayer" />
                            <span class="unit">层</span>
                        </div>
                    </div>

                    <!-- 施工高度 -->
                    <div class="form-group">
                        <label class="form-label">施工高度</label>
                        <div class="input-with-unit">
                            <input type="number" class="form-input" v-model="formData.height" step="0.1" />
                            <span class="unit">米</span>
                        </div>
                    </div>

                    <!-- 楼栋负责工长 -->
                    <div class="form-group">
                        <label class="form-label">楼栋负责工长</label>
                        <input type="text" class="form-input" v-model="formData.manager" />
                    </div>

                    <!-- 联系电话 -->
                    <div class="form-group">
                        <label class="form-label">联系电话</label>
                        <input type="text" class="form-input" v-model="formData.phone" />
                    </div>

                    <!-- 当前施工步骤 -->
                    <div class="form-group">
                        <label class="form-label">当前施工步骤</label>
                        <select class="form-select" v-model="formData.stepType">
                            <option value="">请选择施工步骤</option>
                            <option v-for="option in stepTypeOptions" :key="option.value" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>

                    <!-- 施工进度条 - 跨两列显示 -->
                    <div class="form-group progress-group full-width">
                        <label class="form-label">施工进度</label>
                        <div class="progress-container">
                            <div class="progress-bar">
                                <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
                            </div>
                            <span class="progress-text">{{ formData.builtLayer || 0 }}/{{ formData.totalLayer || 0
                                }}</span>
                        </div>
                    </div>
                </div>

                <!-- 固定在底部的按钮 -->
                <div class="form-actions">
                    <button class="btn btn-primary" @click="saveBuildingInfo">保存</button>
                    <button class="btn btn-secondary" @click="cancel">取消</button>
                </div>
            </div>

            <!-- 右侧预览 -->
            <div class="info-panel">
                <h3 class="panel-title">施工概览</h3>
                <div class="info-card">
                    <div class="card-title">{{ currentBuilding?.buildingTypeText || '未选择楼栋' }}</div>

                    <div class="info-row">
                        <span class="info-label">设计楼层</span>
                        <span class="info-value">{{ formData.totalLayer || 0 }}层</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">设计高度</span>
                        <span class="info-value">{{ formData.designHeight || 0 }}米</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">施工楼层</span>
                        <span class="info-value">{{ formData.builtLayer || 0 }}层</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">施工高度</span>
                        <span class="info-value">{{ formData.height || 0 }}米</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">负责工长</span>
                        <span class="info-value">{{ formData.manager || '未设置' }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">联系电话</span>
                        <span class="info-value">{{ formData.phone || '未设置' }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">当前步骤</span>
                        <span class="info-value">{{ getStepTypeLabel(formData.stepType) || '未设置' }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">施工进度</span>
                        <span class="info-value">{{ progressPercentage.toFixed(1) }}%</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { buildingInfoStore } from '../BuildingInfoStore';
import { ref, watch, computed } from 'vue';
import { saveBuildingInfo as apiSaveBuildingInfo } from '../BizBuildingInfo.api';
import { buildingInfoEmitter, BuildingInfoEvents } from '../event';

const store = buildingInfoStore();

// 表单数据
const formData = ref({
    id: '',
    totalLayer: 0,
    builtLayer: 0,
    designHeight: 0,
    height: 0,
    manager: '',
    phone: '',
    stepType: ''
});

// 存储初始数据，用于取消操作
const originalFormData = ref({
    id: '',
    totalLayer: 0,
    builtLayer: 0,
    designHeight: 0,
    height: 0,
    manager: '',
    phone: '',
    stepType: ''
});

// 当前选中的楼栋
const currentBuilding = computed(() => store.currentBuildingData);

// 施工步骤选项
const stepTypeOptions = ref([
    { value: '0', label: '基础施工' },
    { value: '1', label: '主体结构' },
    { value: '2', label: '钢筋捆扎' },
    { value: '3', label: '混凝土浇筑' }
]);

// 计算施工进度百分比
const progressPercentage = computed(() => {
    if (!formData.value.totalLayer || formData.value.totalLayer === 0) return 0;
    return (formData.value.builtLayer / formData.value.totalLayer) * 100;
});

// 格式化更新时间
const formatUpdateTime = (updateTime) => {
    if (!updateTime) return '-';
    const date = new Date(updateTime);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// 获取施工步骤标签
const getStepTypeLabel = (value) => {
    const option = stepTypeOptions.value.find(opt => opt.value === value);
    return option ? option.label : '';
};

// 初始化表单数据
const initFormData = () => {
    if (currentBuilding.value) {
        const data = {
            id: currentBuilding.value.id || '',
            totalLayer: currentBuilding.value.totalLayer || 0,
            builtLayer: currentBuilding.value.builtLayer || 0,
            designHeight: currentBuilding.value.designHeight || 0,
            height: currentBuilding.value.height || 0,
            manager: currentBuilding.value.manager || '',
            phone: currentBuilding.value.phone || '',
            stepType: currentBuilding.value.stepType || ''
        };
        formData.value = { ...data };
        originalFormData.value = { ...data }; // 保存初始数据
    }
};

// 保存楼栋信息
const saveBuildingInfo = async () => {
    try {
        const payload = {
            ...formData.value,
            buildingType: currentBuilding.value?.buildingType,
            buildingTypeText: currentBuilding.value?.buildingTypeText
        };

        // 调用 API 保存
        const response = await apiSaveBuildingInfo(payload);

        // 显示保存成功提示 - 更大更靠下的弹窗
        createMessage.success({
            content: '保存成功',
            duration: 3000, // 显示3秒
            key: 'save-success',
            style: {
                fontSize: '16px',
                minWidth: '200px',
                marginTop: '100px' // 往下偏一些
            }
        });

        // 更新 store 中的数据
        store.updateCurrentBuildingData(payload);

        // 通知左侧列表刷新，但不改变当前路由/标签
        buildingInfoEmitter.emit(BuildingInfoEvents.RefreshBuildingList);

    } catch (error) {
        console.error('保存失败:', error);
    }
};

// 取消操作 - 重新加载当前楼栋数据
const cancel = () => {
    // 清除当前编辑状态
    initFormData();

    // 通知刷新当前楼栋数据（会触发 Sidebar 的 setActive 重新执行）
    if (typeof window !== 'undefined') {
        // 通过事件机制通知重新加载
        buildingInfoEmitter.emit(BuildingInfoEvents.RefreshBuildingList);
    }
};

// 监听当前楼栋变化，更新表单数据
watch(
    () => currentBuilding.value,
    () => {
        initFormData();
    },
    { deep: true, immediate: true }
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
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
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

/* 带单位的输入框 */
.input-with-unit {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.input-with-unit .form-input {
    flex: 1;
}

.unit {
    color: #666;
    font-size: 0.875rem;
    white-space: nowrap;
}

/* 下拉选择框 */
.form-select {
    width: 100%;
    max-width: 20rem;
    padding: 0.5rem 0.75rem;
    border: 0.0625rem solid #d9d9d9;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    background: white;
    transition: border-color 0.2s ease;
}

.form-select:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 0.125rem rgba(25, 118, 210, 0.1);
}

/* 进度条样式 */
.progress-group {
    margin-top: 1rem;
}

/* 跨两列显示 */
.full-width {
    grid-column: 1 / -1;
}

.progress-container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.progress-bar {
    flex: 1;
    height: 0.5rem;
    background: #f0f0f0;
    border-radius: 0.25rem;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #8bc34a);
    border-radius: 0.25rem;
    transition: width 0.3s ease;
}

.progress-text {
    color: #666;
    font-size: 0.875rem;
    font-weight: 500;
    min-width: 4rem;
    text-align: right;
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
