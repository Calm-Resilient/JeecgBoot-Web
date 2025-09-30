<template>
    <main class="main-content">
        <div class="content-header">
            <h2 class="content-title">{{ currentCategory || '未选择分类' }}</h2>
            <div class="last-update">上次更新时间：{{ formatUpdateTime(lastUpdateTime) }}</div>
        </div>

        <div class="content-body">
            <div class="form-section">
                <!-- 流程说明 -->
                <div class="section-title">流程说明</div>
                <div class="process-description">
                    <textarea v-model="processDescription" class="process-textarea" placeholder="请输入流程说明"></textarea>
                </div>

                <!-- 信息弹窗 -->
                <div class="section-title">信息弹窗</div>

                <!-- 表单内容区域 -->
                <div class="form-content">

                    <!-- 分类区域：严格按原型只展示已有字段（左标题右内容），不在分类内出现新增按钮 -->
                    <div v-for="category in currentSubCategories" :key="category.key" class="category-section">
                        <h3 class="category-title">{{ category.title }}</h3>

                        <!-- 该分类下的字段列表（可编辑） -->
                        <div class="category-fields">
                            <div v-for="(field, index) in getFieldsByCategoryEx(category)" :key="field.id || index"
                                class="field-item">
                                <label class="form-label">{{ field.fieldConfig || '字段名称' }}</label>
                                <div class="field-row">
                                    <input type="text" class="form-input" v-model="field.fieldContent"
                                        :placeholder="field.fieldConfig || '请输入内容'" :data-field="index"
                                        :data-category="category.key" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 无分类区域 -->
                    <div class="category-section no-category-section">
                        <h3 class="category-title">
                            其他信息
                            <a-tooltip placement="right">
                                <template #title>
                                    <div>未选择分类会展示在该区域</div>
                                </template>
                                <QuestionCircleOutlined class="help-icon" />
                            </a-tooltip>
                        </h3>
                        <!-- 无分类的字段列表（可编辑） -->
                        <div class="category-fields">
                            <div v-for="(field, index) in fieldsWithoutCategory" :key="field.id || index"
                                class="field-item">
                                <label class="form-label">{{ field.fieldConfig || '字段名称' }}</label>
                                <div class="field-row">
                                    <input type="text" class="form-input" v-model="field.fieldContent"
                                        :placeholder="field.fieldConfig || '请输入内容'" :data-field="index"
                                        data-category="other" />

                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 固定在底部的唯一“添加自定义信息”按钮（按原型） -->
                    <div>
                        <button class="add-button" @click="openAddFieldModal(null)">
                            <svg width="1rem" height="0.7rem" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            添加自定义信息
                        </button>
                    </div>

                    <!-- 固定在底部的按钮 -->
                    <div class="form-actions">
                        <button class="btn btn-primary" :disabled="isSaving" @click="saveData">保存</button>
                        <button class="btn btn-secondary" @click="cancel">取消</button>
                    </div>
                </div>
            </div>

            <!-- 右侧预览 -->
            <div class="info-panel">
                <h3 class="panel-title">三维卡片预览</h3>
                <div class="info-card">
                    <div class="card-title">{{ currentCategory || '未选择分类' }}</div>

                    <!-- 流程说明预览 -->
                    <div class="info-row">
                        <span class="info-label">流程说明</span>
                        <span class="info-value">{{ processDescription || '未设置' }}</span>
                    </div>

                    <!-- 动态字段预览 -->
                    <div v-for="field in fieldsData" :key="field.id || field.fieldConfig" class="info-row">
                        <span class="info-label">{{ field.fieldConfig || '字段名称' }}</span>
                        <span class="info-value">{{ field.fieldContent || '未设置' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加自定义信息弹窗 -->
        <div v-if="showAddFieldModal" class="modal-overlay" @click.self="closeAddFieldModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>添加自定义信息</h3>
                    <button class="close-button" @click="closeAddFieldModal">&times;</button>
                </div>
                <div class="modal-body">
                    <!-- 分类选择 -->
                    <div class="form-group">
                        <label class="form-label">信息分类</label>
                        <select v-model="newField.titleCategory" class="form-select">
                            <option value="">请选择分类（非必填）</option>
                            <option v-for="category in currentSubCategories" :key="category.key" :value="category.code">
                                {{ category.title }}
                            </option>
                        </select>
                    </div>

                    <!-- 字段名称 -->
                    <div class="form-group">
                        <label class="form-label">字段名称</label>
                        <input type="text" v-model="newField.fieldConfig" class="form-input" placeholder="请输入字段名称" />
                    </div>

                    <!-- 字段值 -->
                    <div class="form-group">
                        <label class="form-label">字段值</label>
                        <input type="text" v-model="newField.fieldContent" class="form-input" placeholder="请输入字段值" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" @click="addCustomField">保存</button>
                    <button class="btn btn-secondary" @click="closeAddFieldModal">取消</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount, type Ref } from 'vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { virtualBuildStore, type CategoryItem, type FieldItem } from '../VirtualBuildStore';
import { getVirtualBuildList, batchSaveOrUpdate, saveField } from '../VirtualBuild.api';
import { virtualBuildEmitter, VirtualBuildEvents } from '../event';
import { useMessage } from '/@/hooks/web/useMessage';

const { createMessage } = useMessage();
const store = virtualBuildStore();

// 基本数据
const processDescription = ref<string>('');
const processDescriptionId = ref<string | null>(null);
const isSaving = ref<boolean>(false);
const errorFields = ref<{ [key: string]: string[] }>({});
const lastUpdateTime: Ref<string | null> = ref(null);

// 弹窗相关
const showAddFieldModal = ref<boolean>(false);
const selectedCategory = ref<CategoryItem | null>(null);
const newField = ref<FieldItem>({
    progressType: '',
    titleCategory: '',
    fieldConfig: '',
    fieldContent: ''
});

// 计算属性
const currentCategory = computed(() => store.selectedCategory);
const currentCategoryCode = computed(() => store.selectedCategoryCode);
const currentSubCategories = computed(() => store.currentSubCategories);
const fieldsData = computed(() => store.currentFieldsData);

// 获取无分类的字段
const fieldsWithoutCategory = computed(() => {
    return fieldsData.value.filter(field => !field.titleCategory || field.titleCategory === '');
});

// 根据分类代码获取默认流程说明
const getDefaultProcessDescription = (categoryCode: string) => {
    const processDescriptions: Record<string, string> = {
        'c03-01': '钢筋在制作钢筋厂进行生产，系统记录生产批次、规格、数量等信息，并生成唯一标识码。',
        'c03-02': '混凝土在搅拌站进行生产，系统记录配合比、强度等级、生产时间等信息，并生成质量追溯码。',
        'c03-03': '预制构件在工厂进行生产，系统记录构件类型、尺寸、生产日期等信息，并生成唯一标识码。',
        'c03-04': '钢结构在加工厂进行生产，系统记录钢材规格、加工工艺、质量检测等信息，并生成追溯码。',
        'c03-05': '其他材料按照相应标准进行生产，系统记录材料属性、供应商、质量证明等信息。'
    };

    return processDescriptions[categoryCode] || '请根据实际生产流程填写流程说明。';
};

// 根据分类获取字段
const getFieldsByCategoryEx = (category: CategoryItem) => {
    const norm = (v: unknown) => String(v ?? '').trim().toUpperCase();
    const code = norm(category.code);
    const title = norm(category.title);

    console.log('分类信息:', { code: category.code, title: category.title, normCode: code, normTitle: title });
    console.log('所有字段数据长度:', fieldsData.value.length);
    console.log('所有字段数据详情:', JSON.stringify(fieldsData.value, null, 2));

    if (fieldsData.value.length === 0) {
        console.log('字段数据为空，返回空数组');
        return [];
    }

    const matched = fieldsData.value.filter((field: any) => {
        const fCode = norm(field.titleCategory);
        const fDictText = norm(field.titleCategorydictText);
        const isMatch = (fCode && fCode === code) || (fDictText && fDictText === title);
        console.log('字段匹配检查:', {
            fieldConfig: field.fieldConfig,
            titleCategory: field.titleCategory,
            titleCategorydictText: field.titleCategorydictText,
            fCode,
            fDictText,
            isMatch
        });
        return isMatch;
    });

    console.log('匹配结果:', matched);
    return matched;
};


// 打开添加字段弹窗
const openAddFieldModal = (category: CategoryItem | null) => {
    selectedCategory.value = category;
    newField.value = {
        progressType: String(currentCategoryCode.value || '').trim(),
        titleCategory: category ? String(category.code || '').trim() : '',
        fieldConfig: '',
        fieldContent: ''
    };
    showAddFieldModal.value = true;
};

// 关闭添加字段弹窗
const closeAddFieldModal = () => {
    showAddFieldModal.value = false;
};

// 添加自定义字段
const addCustomField = async () => {
    // 预填充必要编码
    newField.value.progressType = String(currentCategoryCode.value || '').trim();
    if (!newField.value.titleCategory && selectedCategory.value) {
        newField.value.titleCategory = String(selectedCategory.value.code || '').trim();
    }

    // 验证字段
    if (!newField.value.progressType ||
        newField.value.fieldConfig.trim() === '' ||
        newField.value.fieldContent.trim() === '') {
        createMessage.error('请填写完整信息');
        return;
    }

    try {
        // 保存字段（新增使用 save 接口，传编码字段）
        await saveField({
            id: newField.value.id ?? null,
            progressType: newField.value.progressType,
            titleCategory: newField.value.titleCategory,
            fieldConfig: newField.value.fieldConfig.trim(),
            fieldContent: newField.value.fieldContent.trim()
        } as any);

        // 在刷新页面数据之前，先提交当前页面上可能已编辑但未保存的字段，避免被重置
        const payload = fieldsData.value
            .map((field) => ({
                id: field.id,
                progressType: currentCategoryCode.value,
                titleCategory: field.titleCategory,
                fieldConfig: String(field.fieldConfig || '').trim(),
                fieldContent: String(field.fieldContent || '').trim(),
            }))
            .filter((f) => f.fieldConfig !== '' && f.fieldContent !== '');

        if (payload.length > 0) {
            await batchSaveOrUpdate(payload as any);
        }

        // 刷新字段数据
        fetchFieldsData(currentCategoryCode.value);

        // 关闭弹窗
        closeAddFieldModal();

        // 显示成功提示
        // createMessage.success('添加成功');
    } catch (error) {
        // console.error('添加字段失败:', error);
        // createMessage.error('添加失败');
    }
};

// 分类内不再提供删除/编辑入口（按原型），保留函数占位避免引用报错

// 已去除无分类字段编辑/删除场景，不再需要索引换算

// 格式化更新时间
const formatUpdateTime = (updateTime: string | null) => {
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

// 仅保留校验容器，按原型不再触发输入抖动


// 获取字段数据
const fetchFieldsData = async (progressType: string) => {
    if (!progressType) return;

    try {
        console.log('开始获取字段数据，progressType:', progressType);
        const response = await getVirtualBuildList(progressType);
        console.log('API响应:', response);

        // 检查数据格式
        let fields: FieldItem[] = [];
        if (response && response.result && response.result.records) {
            fields = response.result.records;
            console.log('从 response.result.records 获取数据:', fields);
        } else if (Array.isArray(response)) {
            fields = response;
            console.log('从 response 数组获取数据:', fields);
        } else if (response && Array.isArray(response.result)) {
            fields = response.result;
            console.log('从 response.result 数组获取数据:', fields);
        }

        console.log('最终解析的字段数据:', fields);

        // 数据清洗和标准化处理
        const cleanedFields = fields.map(field => ({
            ...field,
            // 确保字段值不为undefined或null
            fieldConfig: field.fieldConfig || '',
            fieldContent: field.fieldContent || '',
            titleCategory: typeof (field as any).titleCategory === 'string' ? (field as any).titleCategory.trim() : (field as any).titleCategory,
            titleCategorydictText: typeof (field as any).titleCategorydictText === 'string' ? (field as any).titleCategorydictText.trim() : (field as any).titleCategorydictText
        }));

        console.log('清洗后的字段数据:', cleanedFields);

        // 更新最后更新时间
        const latestUpdate = fields.reduce((latest: string | null, item: any) => {
            if (item.updateTime && (!latest || new Date(item.updateTime) > new Date(latest))) {
                return item.updateTime;
            }
            return latest;
        }, null);
        lastUpdateTime.value = latestUpdate;

        // 查找流程说明字段，如果存在则更新流程说明文本框
        const processDescField = cleanedFields.find(field => field.fieldConfig === '流程说明');
        if (processDescField) {
            processDescription.value = processDescField.fieldContent;
            processDescriptionId.value = (processDescField as any).id ?? null;
        } else {
            // 如果没有找到流程说明字段，根据当前分类设置默认值
            processDescription.value = getDefaultProcessDescription(currentCategoryCode.value);
            processDescriptionId.value = null;
        }

        // 从字段数据中过滤掉流程说明字段，避免在"其他信息"中重复显示
        const filteredFields = cleanedFields.filter(field => field.fieldConfig !== '流程说明');
        store.updateCurrentFieldsData(filteredFields);
    } catch (error) {
        console.error('获取字段数据失败:', error);
        store.updateCurrentFieldsData([]);
    }
};

// 保存所有数据
const saveData = async () => {
    if (isSaving.value) return;
    isSaving.value = true;

    // 清除之前的错误
    errorFields.value = {};

    // 验证所有字段
    let hasValidationError = false;
    fieldsData.value.forEach((field, index) => {
        if (!field.fieldConfig?.trim()) {
            errorFields.value[`${index}-title`] = ['字段名称不能为空'];
            hasValidationError = true;
        }
        if (!field.fieldContent?.trim()) {
            errorFields.value[`${index}-content`] = ['字段内容不能为空'];
            hasValidationError = true;
        }
    });

    if (hasValidationError) {
        createMessage.error('请填写完整所有必填字段');
        isSaving.value = false;
        return;
    }

    try {
        // 准备要保存的数据 - 包括所有分类的字段
        const allFields = [
            ...fieldsData.value,
            ...currentSubCategories.value.flatMap(category => getFieldsByCategoryEx(category)),
            ...fieldsWithoutCategory.value
        ];

        // 去重处理，避免重复保存
        const uniqueFields = allFields.filter((field, index, self) =>
            index === self.findIndex(f => f.id === field.id && f.fieldConfig === field.fieldConfig)
        );

        const fieldsToSave = uniqueFields.map(field => {
            // 创建一个新对象，只包含需要发送给后端的字段
            const cleanField = {
                id: field.id,
                progressType: currentCategoryCode.value,
                titleCategory: field.titleCategory,
                fieldConfig: field.fieldConfig?.trim() || '',
                fieldContent: field.fieldContent?.trim() || ''
            };
            return cleanField;
        });

        // 处理流程说明字段 - 始终保存流程说明，并携带已有ID进行更新
        if (processDescription.value.trim()) {
            fieldsToSave.push({
                id: processDescriptionId.value as any,
                progressType: currentCategoryCode.value,
                titleCategory: '',
                fieldConfig: '流程说明',
                fieldContent: processDescription.value.trim()
            });
        }

        // 过滤掉空字段，避免保存无效数据
        const validFields = fieldsToSave.filter(field =>
            field.fieldConfig.trim() !== '' &&
            field.fieldContent.trim() !== ''
        );

        if (validFields.length === 0) {
            createMessage.warning('没有有效的数据需要保存');
            isSaving.value = false;
            return;
        }

        // 批量保存数据
        await batchSaveOrUpdate(validFields);

        // 更新最后更新时间
        lastUpdateTime.value = new Date().toISOString();

        // // 显示成功提示
        // createMessage.success({
        //     content: '保存成功',
        //     duration: 3000,
        //     key: 'save-success',
        //     style: {
        //         fontSize: '16px',
        //         minWidth: '200px',
        //         marginTop: '100px'
        //     }
        // });

        // 先清空当前字段数据，避免保存后出现重复数据
        store.updateCurrentFieldsData([]);

        // 刷新数据以获取后端生成的ID和更新时间
        await fetchFieldsData(currentCategoryCode.value);

        // 通知其他组件刷新
        virtualBuildEmitter.emit(VirtualBuildEvents.RefreshFieldsData, currentCategoryCode.value);
    } catch (error) {
        console.error('保存失败:', error);
        createMessage.error('保存失败');
    } finally {
        // 延时解除保存按钮禁用状态
        setTimeout(() => {
            isSaving.value = false;
        }, 3000);
    }
};

// 取消操作
const cancel = () => {
    // 重新获取数据
    fetchFieldsData(currentCategoryCode.value);
};

// 监听刷新字段数据事件
const handleRefreshFields = (progressType: string) => {
    fetchFieldsData(progressType);
};

onMounted(() => {
    virtualBuildEmitter.on(VirtualBuildEvents.RefreshFieldsData, handleRefreshFields);
});

onBeforeUnmount(() => {
    virtualBuildEmitter.off(VirtualBuildEvents.RefreshFieldsData, handleRefreshFields);
});

// 监听当前分类变化
watch(currentCategoryCode, (newCode) => {
    if (newCode) {
        // 先设置默认流程说明
        processDescription.value = getDefaultProcessDescription(newCode);
        fetchFieldsData(newCode);
    }
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

.info-panel {
    width: 16rem;
    flex-shrink: 0;
    border-left: 2px solid #e8e8e8;
    padding-left: 1rem;
}

.panel-title {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 1rem;
}

.info-card {
    background: #f8f9fa;
    border-radius: 0.5rem;
    padding: 1rem;
}

.card-title {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 0.0625rem solid #e8e8e8;
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

.info-label {
    font-size: 0.875rem;
    color: #666;
    flex: 0 0 40%;
}

.info-value {
    font-size: 0.875rem;
    color: #333;
    font-weight: 500;
    flex: 0 0 60%;
    text-align: right;
    word-break: break-word;
}

.content-body {
    flex: 1;
    display: flex;
    padding: 1.5rem 2rem;
    gap: 1.5rem;
    overflow: hidden;
}

.form-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
}

.section-title {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 1rem;
    padding: 0.5rem 0.75rem;
    background-color: #f5f5f5;
    border: 0.0625rem solid #ececec;
    border-radius: 0.375rem;
}

.process-description {
    margin-bottom: 2rem;
    background-color: #fafafa;
    border: 0.0625rem solid #f0f0f0;
    border-radius: 0.375rem;
    padding: 0.75rem;
}

.process-textarea {
    width: 100%;
    min-height: 4.25rem;
    padding: 0.5rem 0.75rem;
    border: 0.0625rem solid #d9d9d9;
    border-radius: 0.25rem;
    resize: vertical;
    font-size: 0.875rem;
    transition: border-color 0.2s ease;
}

.process-textarea:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 0.125rem rgba(25, 118, 210, 0.1);
}

.category-section {
    margin-bottom: 2rem;
}

.category-title {
    font-size: 0.9375rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 1rem;
}

.help-icon {
    color: #999;
    font-size: 14px;
    cursor: help;
    transition: color 0.2s;
    margin-left: 4px;
}

.help-icon:hover {
    color: #1890ff;
}


.category-fields {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
}

@media (max-width: 1200px) {
    .category-fields {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 900px) {
    .category-fields {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 600px) {
    .category-fields {
        grid-template-columns: repeat(2, 1fr);
    }
}

.form-content {
    flex: 1;
    overflow-y: auto;
    padding-bottom: 1rem;
}

.field-item {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    border: 0.0625rem solid #e8e8e8;
    border-radius: 0.25rem;
    background-color: #f9f9f9;
    min-width: 0;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: #333;
    font-weight: 500;
}

.field-row {
    display: flex;
    align-items: center;
    position: relative;
}

.form-input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: 0.0625rem solid #d9d9d9;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    transition: border-color 0.2s ease;
}

.display-value {
    padding: 0.375rem 0.75rem;
    border: 0.0625rem solid #d9d9d9;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    color: #333;
    min-height: 2rem;
    line-height: 1.5rem;
    background-color: #fff;
    width: fit-content;
    min-width: 8rem;
    max-width: 20rem;
}

.form-input:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 0.125rem rgba(25, 118, 210, 0.1);
}

.form-input.error {
    border-color: #ff4d4f;
    animation: shake 0.5s ease-in-out;
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

.remove-btn {
    background: none;
    border: none;
    color: #ff4d4f;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.remove-btn:hover {
    color: #ff7875;
}

.add-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem;
    background: transparent;
    border: 0.0625rem dashed #d9d9d9;
    border-radius: 0.25rem;
    color: #666;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s ease;
    grid-column: span 2;
    margin-top: 1rem;
}

.add-button:hover {
    border-color: #1976d2;
    color: #1976d2;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem;
    border-top: 0.0625rem solid #f0f0f0;
    background: white;
    flex-shrink: 0;
    margin-top: auto;
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

.btn-primary:disabled {
    background: #a0c4e4;
    cursor: not-allowed;
}

.btn-secondary {
    background: #f5f5f5;
    color: #666;
    border: 0.0625rem solid #d9d9d9;
}

/* 弹窗样式 */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    width: 30rem;
    max-width: 90%;
    background-color: white;
    border-radius: 0.375rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 0.0625rem solid #e8e8e8;
}

.modal-header h3 {
    font-size: 1.125rem;
    font-weight: 500;
    color: #333;
    margin: 0;
}

.close-button {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    color: #999;
    cursor: pointer;
    padding: 0;
    line-height: 1;
}

.modal-body {
    padding: 1.5rem;
    background-color: #fafafa;
    border-top: 0.0625rem solid #f0f0f0;
    border-bottom: 0.0625rem solid #f0f0f0;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-top: 0.0625rem solid #e8e8e8;
}

.form-group {
    margin-bottom: 1.5rem;
    position: relative;
}

.form-select {
    width: 100%;
    max-width: 20rem;
    padding: 0.5rem 0.75rem;
    border: 0.0625rem solid #d9d9d9;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    transition: border-color 0.2s ease;
}

.form-select:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 0.125rem rgba(25, 118, 210, 0.1);
}

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
</style>
