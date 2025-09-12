<template>
    <a-spin :spinning="confirmLoading">
        <JFormContainer :disabled="disabled">
            <template #detail>
                <a-form ref="formRef" class="antd-modal-form" :labelCol="labelCol" :wrapperCol="wrapperCol"
                    name="BizFurnitureInfoForm">
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="颜色描述" v-bind="validateInfos.color" id="BizFurnitureInfoForm-color"
                                name="color">
                                <a-input v-model:value="formData.color" placeholder="请输入颜色描述" allow-clear></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="家具名称" v-bind="validateInfos.name" id="BizFurnitureInfoForm-name"
                                name="name">
                                <a-input v-model:value="formData.name" placeholder="请输入家具名称" allow-clear></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="厂家或者xx厂家，默认厂家" v-bind="validateInfos.factory"
                                id="BizFurnitureInfoForm-factory" name="factory">
                                <a-input v-model:value="formData.factory" placeholder="请输入厂家或者xx厂家，默认厂家"
                                    allow-clear></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="家具图片" v-bind="validateInfos.imageString"
                                id="BizFurnitureInfoForm-imageString" name="imageString">
                                <a-input v-model:value="formData.imageString" placeholder="请输入家具图片"
                                    allow-clear></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="位置描述" v-bind="validateInfos.area" id="BizFurnitureInfoForm-area"
                                name="area">
                                <a-input v-model:value="formData.area" placeholder="请输入位置描述" allow-clear></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="规格描述" v-bind="validateInfos.spec" id="BizFurnitureInfoForm-spec"
                                name="spec">
                                <a-input v-model:value="formData.spec" placeholder="请输入规格描述" allow-clear></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="特殊项描述" v-bind="validateInfos.special" id="BizFurnitureInfoForm-special"
                                name="special">
                                <a-input v-model:value="formData.special" placeholder="请输入特殊项描述" allow-clear></a-input>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </template>
        </JFormContainer>
    </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive, defineExpose, nextTick, defineProps, computed, onMounted } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';
import { getDateByPicker, getValueType } from '/@/utils';
import { saveOrUpdate } from '/@/api/biz/BizFurnitureInfo.api';
import { Form } from 'ant-design-vue';
import JFormContainer from '/@/components/Form/src/container/JFormContainer.vue';
const props = defineProps({
    formDisabled: { type: Boolean, default: false },
    formData: { type: Object, default: () => ({}) },
    formBpm: { type: Boolean, default: true }
});
const formRef = ref();
const useForm = Form.useForm;
const emit = defineEmits(['register', 'ok']);
const formData = reactive<Record<string, any>>({
    id: '',
    color: '',
    name: '',
    factory: '',
    imageString: '',
    area: '',
    spec: '',
    special: '',
});
const { createMessage } = useMessage();
const labelCol = ref<any>({ xs: { span: 24 }, sm: { span: 5 } });
const wrapperCol = ref<any>({ xs: { span: 24 }, sm: { span: 16 } });
const confirmLoading = ref<boolean>(false);
//表单验证
const validatorRules = reactive({
});
const { resetFields, validate, validateInfos } = useForm(formData, validatorRules, { immediate: false });
//日期个性化选择
const fieldPickers = reactive({
});

// 表单禁用
const disabled = computed(() => {
    if (props.formBpm === true) {
        if (props.formData.disabled === false) {
            return false;
        } else {
            return true;
        }
    }
    return props.formDisabled;
});


/**
 * 新增
 */
function add() {
    edit({});
}

/**
 * 编辑
 */
function edit(record) {
    nextTick(() => {
        resetFields();
        const tmpData = {};
        Object.keys(formData).forEach((key) => {
            if (record.hasOwnProperty(key)) {
                tmpData[key] = record[key]
            }
        })
        //赋值
        Object.assign(formData, tmpData);
    });
}

/**
 * 提交数据
 */
async function submitForm() {
    try {
        // 触发表单验证
        await validate();
    } catch ({ errorFields }) {
        if (errorFields) {
            const firstField = errorFields[0];
            if (firstField) {
                formRef.value.scrollToField(firstField.name, { behavior: 'smooth', block: 'center' });
            }
        }
        return Promise.reject(errorFields);
    }
    confirmLoading.value = true;
    const isUpdate = ref<boolean>(false);
    //时间格式化
    let model = formData;
    if (model.id) {
        isUpdate.value = true;
    }
    //循环数据
    for (let data in model) {
        // 更新个性化日期选择器的值
        model[data] = getDateByPicker(model[data], fieldPickers[data]);
        //如果该数据是数组并且是字符串类型
        if (model[data] instanceof Array) {
            let valueType = getValueType(formRef.value.getProps, data);
            //如果是字符串类型的需要变成以逗号分割的字符串
            if (valueType === 'string') {
                model[data] = model[data].join(',');
            }
        }
    }
    await saveOrUpdate(model, isUpdate.value)
        .then((res) => {
            if (res.success) {
                createMessage.success(res.message);
                emit('ok');
            } else {
                createMessage.warning(res.message);
            }
        })
        .finally(() => {
            confirmLoading.value = false;
        });
}


defineExpose({
    add,
    edit,
    submitForm,
});
</script>

<style lang="less" scoped>
.antd-modal-form {
    padding: 14px;
}
</style>
