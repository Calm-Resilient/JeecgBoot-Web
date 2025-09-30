<template>
    <main class="main-content">
        <div class="content-header">
            <h2 class="content-title">{{ currentDeviceType || '未选择设备' }}</h2>
            <div class="last-update">上次更新时间：{{ formatUpdateTime(lastUpdateTime) }}</div>
        </div>

        <div class="content-body">
            <div class="form-section">
                <!-- 设备信息表单 -->
                <div class="form-content">

                    <!-- 字段列表：已存在字段与自定义字段风格与区域信息管理一致 -->
                    <div v-for="(field, index) in deviceFields" :key="field.id || index" class="form-group">
                        <!-- 已有字段：左侧标签 + 右侧内容输入 -->
                        <template v-if="field.id">
                            <label class="form-label">{{ field.remask || '字段描述' }}</label>
                            <div class="field-row">
                                <input type="text" class="form-input" v-model="field.displayContent" :data-field="index"
                                    data-key="content" :class="{ error: hasError(index, 'content') }"
                                    @animationend="clearShakeAnimation" />
                            </div>
                        </template>

                        <!-- 新增自定义字段：两行输入（标题=remask，内容=displayContent），仅新增可删除 -->
                        <template v-else>
                            <div class="custom-field">
                                <div class="custom-field-row">
                                    <input type="text" class="form-input" v-model="field.remask" placeholder="字段标题"
                                        :data-field="index" data-key="title"
                                        :class="{ error: hasError(index, 'title') }"
                                        @animationend="clearShakeAnimation" />
                                    <button type="button" class="remove-btn" @click="removeField(index)"
                                        title="删除字段">✕</button>
                                </div>
                                <div class="custom-field-row">
                                    <input type="text" class="form-input" v-model="field.displayContent"
                                        placeholder="字段内容" :data-field="index" data-key="content"
                                        :class="{ error: hasError(index, 'content') }"
                                        @animationend="clearShakeAnimation" />
                                </div>
                            </div>
                        </template>
                    </div>

                    <!-- 添加自定义字段按钮 -->
                    <div class="form-group">
                        <button class="add-button" @click="addCustomField">
                            <svg width="1rem" height="0.7rem" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            添加自定义字段
                        </button>
                    </div>
                </div>

                <!-- 固定在底部的按钮 -->
                <div class="form-actions">
                    <button class="btn btn-primary" :disabled="isSaving" @click="saveDeviceInfo">保存</button>
                    <button class="btn btn-secondary" @click="cancel">取消</button>
                </div>
            </div>

            <!-- 右侧预览 -->
            <div class="info-panel">
                <h3 class="panel-title">三维卡片预览</h3>
                <div class="info-card">
                    <div class="card-title">{{ currentDeviceType || '未选择设备' }}</div>

                    <!-- 动态字段预览 -->
                    <div v-for="field in deviceFields" :key="field.id || field.remask" class="info-row">
                        <span class="info-label">{{ field.remask || '字段描述' }}</span>
                        <span class="info-value">{{ field.displayContent || '未设置' }}</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { deviceInfoStore } from '../DeviceInfoStore';
import { ref, watch, computed, onMounted, onBeforeUnmount, type Ref } from 'vue';
import { saveDeviceInfo as apiSaveDeviceInfo, queryByDeviceId, list as apiList } from '../BizDeviceInfo.api';
// eslint-disable-next-line import/no-relative-packages
// @ts-ignore 类型声明非必须
import { deviceInfoEmitter, DeviceInfoEvents } from '../event';

interface DeviceField {
    id?: number | string | null;
    deviceType: string;
    deviceId: string;
    displayContent: string;
    remask: string;
    isNew?: boolean;
    updateTime?: string | null;
}

const store = deviceInfoStore();

// 设备基本信息
const deviceType: Ref<string> = ref('');
const deviceId: Ref<string> = ref('');
const deviceFields: Ref<DeviceField[]> = ref([]);
const validationErrors: Ref<Record<string, boolean>> = ref({});
const lastUpdateTime: Ref<string | null> = ref(null);
const isSaving: Ref<boolean> = ref(false);

// 当前选中的设备类型
const currentDeviceType = computed(() => store.selectedDeviceType);

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

// 初始化设备数据
const initDeviceData = () => {
    const currentData = store.currentDeviceData;
    if (currentData && currentData.length > 0) {
        // 设置设备类型和ID（从第一条数据获取）
        deviceType.value = currentData[0].deviceType || '';
        deviceId.value = currentData[0].deviceId || '';

        // 设置字段数据
        deviceFields.value = (currentData as any[]).map((item: any): DeviceField => ({
            id: item.id,
            deviceType: item.deviceType,
            deviceId: item.deviceId,
            displayContent: item.displayContent || '',
            remask: item.remask || '',
            isNew: false // 现有字段不是新增的
        }));

        // 更新最后更新时间
        const latestUpdate = currentData.reduce((latest, item) => {
            if (item.updateTime && (!latest || new Date(item.updateTime) > new Date(latest))) {
                return item.updateTime;
            }
            return latest;
        }, null);
        lastUpdateTime.value = latestUpdate || null;
    } else {
        // 清空数据
        deviceType.value = '';
        deviceId.value = '';
        deviceFields.value = [];
        lastUpdateTime.value = null;
    }
};

// 添加自定义字段
const addCustomField = () => {
    const newField: DeviceField = {
        id: null, // 新增字段没有ID
        deviceType: deviceType.value,
        deviceId: deviceId.value,
        displayContent: '',
        remask: '',
        isNew: true // 标记为新增字段
    };
    deviceFields.value.push(newField);
};

// 删除字段
const removeField = (index) => {
    if (index >= 0 && index < deviceFields.value.length) {
        deviceFields.value.splice(index, 1);
        // 清除该字段的验证错误
        delete validationErrors.value[`field_${index}`];
    }
};

// 验证字段
const validateFields = () => {
    const errors: Record<string, boolean> = {};
    deviceFields.value.forEach((field: DeviceField, index: number) => {
        // 对新增字段校验标题与内容；已有字段仅校验内容
        if (!field.id) {
            if (!field.remask || field.remask.trim() === '') {
                errors[`title_${index}`] = true;
            }
        }
        if (!field.displayContent || field.displayContent.trim() === '') {
            errors[`content_${index}`] = true;
        }
    });
    validationErrors.value = errors;
    return Object.keys(errors).length === 0;
};

// 清除抖动动画
const clearShakeAnimation = (event) => {
    if (event.target.classList.contains('shake')) {
        event.target.classList.remove('shake');
    }
};

// 错误辅助方法（与区域信息一致：仅红框+抖动）
const hasError = (index: number, key: 'title' | 'content') => {
    return Boolean(validationErrors.value[`${key}_${index}`]);
};

// 保存设备信息
const saveDeviceInfo = async () => {
    if (isSaving.value) return;
    isSaving.value = true;
    // 验证字段
    if (!validateFields()) {
        // 添加抖动效果
        Object.keys(validationErrors.value).forEach(key => {
            const [which, index] = key.split('_');
            const input = document.querySelector(`input[data-field="${index}"][data-key="${which}"]`);
            if (input) {
                input.classList.add('shake');
            }
        });
        isSaving.value = false;
        return;
    }

    let savedOk = false;
    try {
        // 准备保存的数据 - 按照后台接口要求
        // 1) 过滤掉完全空白的项（标题与内容都为空），并确保每条携带 deviceId/deviceType
        const filtered = deviceFields.value.filter((f) => (f.remask && f.remask.trim() !== '') || (f.displayContent && f.displayContent.trim() !== ''));

        // 2) 构造稳定的提交数据（深拷贝 + trim），避免响应式对象副作用
        const saveData = filtered.map((field) => ({
            id: field.id ?? null,
            deviceType: String(field.deviceType ?? deviceType.value).trim(),
            deviceId: String(field.deviceId ?? deviceId.value).trim(),
            displayContent: String(field.displayContent ?? '').trim(),
            remask: String(field.remask ?? '').trim(),
        }));
        // fallback：如果后端需要 deviceId 一致性，保证全部使用当前 active 的 deviceId
        saveData.forEach((row) => {
            if (!row.deviceId) row.deviceId = String(deviceId.value || '').trim();
            if (!row.deviceType) row.deviceType = String(deviceType.value || '').trim();
        });

        // 调用 API 保存
        await apiSaveDeviceInfo(saveData);

        // 更新最后更新时间
        lastUpdateTime.value = new Date().toISOString();

        // 通知左侧列表刷新
        deviceInfoEmitter.emit(DeviceInfoEvents.RefreshDeviceTypeList);

        // 关键修复：保存后立即查询并更新本地字段的ID，避免下次保存时重复新增
        if (deviceId.value) {
            const response = await queryByDeviceId(deviceId.value);
            let dataArray: any[] | null = null;
            if (Array.isArray(response)) {
                dataArray = response;
            } else if (response && response.result && Array.isArray(response.result)) {
                dataArray = response.result;
            } else if (response && response.success && response.result && Array.isArray(response.result)) {
                dataArray = response.result;
            }

            if (dataArray) {
                // 统一清洗（trim），并保持后端真值为准
                const cleaned = dataArray.map((it: any) => ({
                    ...it,
                    remask: typeof it.remask === 'string' ? it.remask.trim() : it.remask,
                    displayContent: typeof it.displayContent === 'string' ? it.displayContent.trim() : it.displayContent,
                }));

                // 更新store和本地字段，确保新增字段获得后端生成的ID
                store.updateCurrentDeviceData(cleaned);
                initDeviceData();
            }
        }

        // 额外保障：保存后重新触发当前路由的查询，确保界面状态完全同步
        // 通过事件通知Sidebar重新查询当前设备数据
        deviceInfoEmitter.emit(DeviceInfoEvents.RefreshCurrentDeviceData);

        savedOk = true;

    } catch (error) {
        console.error('保存失败:', error);
    } finally {
        // 成功时延时解禁，模拟“提示消失后恢复可点”
        const ok = typeof savedOk !== 'undefined' ? savedOk : false;
        if (typeof window !== 'undefined') {
            if (ok) {
                const DISABLE_MS = 3000;
                window.setTimeout(() => (isSaving.value = false), DISABLE_MS);
            } else {
                isSaving.value = false;
            }
        } else {
            isSaving.value = false;
        }
    }
};

// 取消操作
const cancel = () => {
    // 重新初始化数据
    initDeviceData();
};

// 监听当前设备数据变化
watch(
    () => store.currentDeviceData,
    () => {
        initDeviceData();
    },
    { deep: true, immediate: true }
);

onMounted(() => {
    initDeviceData();
});

onBeforeUnmount(() => {
    // 清理工作
});
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
    grid-template-rows: repeat(5, auto);
    gap: 1.2rem;
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
    /* 与区域信息管理一致的单列输入宽度 */
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

.form-input[readonly] {
    background-color: #f5f5f5;
    color: #666;
    cursor: not-allowed;
}

/* 字段行样式 */
.field-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.field-row .form-input {
    flex: 1;
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

.remove-btn {
    background: transparent;
    border: none;
    color: #999;
    font-size: 1rem;
    cursor: pointer;
    padding: 0 0.5rem;
    line-height: 1;
    transition: color 0.2s ease;
    flex-shrink: 0;
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
