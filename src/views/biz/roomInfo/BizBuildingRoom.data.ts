import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
    {
        title: '房间号',
        align: 'center',
        dataIndex: 'roomId',
    },
    {
        title: '楼层号',
        align: 'center',
        dataIndex: 'layerNum',
    },
    {
        title: '是否装修',
        align: 'center',
        dataIndex: 'isDecorated',
        customRender: ({ text }) => {
            const map: Record<string, string> = {
                '0': '未装修',
                '1': '已装修',
            };
            const key = String(text);
            return map[key] ?? '';
        },
    },
    {
        title: '开始时间',
        align: 'center',
        dataIndex: 'startTime',
    },
    {
        title: '结束时间',
        align: 'center',
        dataIndex: 'endTime',
    },
    {
        title: '楼栋号',
        align: 'center',
        dataIndex: 'buildingTypedictText',
    },
    {
        title: '户型',
        align: 'center',
        dataIndex: 'floorPlan',
    },
    {
        title: '预览图',
        align: 'center',
        dataIndex: 'images',
        customRender: render.renderImage,   // 直接调用
        
    },
    {
        title: '备注信息',
        align: 'center',
        dataIndex: 'remark',
    },
    {
        title: '房间面积（㎡）',
        align: 'center',
        dataIndex: 'area',
    },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        label: '房间号',
        field: 'roomId',
        component: 'Input',
        //colProps: {span: 6},
    },
    {
        label: '楼层号',
        field: 'layerNum',
        component: 'Input',
        //colProps: {span: 6},
    },
    {
        label: '是否装修',
        field: 'isDecorated',
        component: 'JDictSelectTag',
        componentProps: {
            options: [
                { value: '0', label: '未装修' },
                { value: '1', label: '已装修' },
            ]
        },
        //colProps: {span: 6},
    },
    {
        label: '楼栋号',
        field: 'buildingType',
        component: 'JSelectMultiple',
        componentProps: {
            dictCode: 'building_type',
        },
        //colProps: {span: 6},
    },
];
//表单数据
export const formSchema: FormSchema[] = [
    {
        label: '房间号',
        field: 'roomId',
        component: 'Input',
    },
    {
        label: '楼层号',
        field: 'layerNum',
        component: 'Input',
    },
    {
        label: '是否装修',
        field: 'isDecorated',
        component: 'JDictSelectTag',
        componentProps: {
            options: [
                { value: '0', label: '未装修' },
                { value: 0, label: '未装修' },
                { value: '1', label: '已装修' },
                { value: 1, label: '已装修' },
            ]
        },
    },
    {
        label: '开始时间',
        field: 'startTime',
        component: 'DatePicker',
        componentProps: {
            showTime: true,
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
    },
    {
        label: '结束时间',
        field: 'endTime',
        component: 'DatePicker',
        componentProps: {
            showTime: true,
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
        },
    },
    {
        label: '关联楼栋表',
        field: 'buildingType',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: 'building_type',
        },
    },
    {
        label: '户型',
        field: 'floorPlan',
        component: 'Input',
    },
    {
        label: '预览图',
        field: 'images',
        component: 'JImageUpload',
        componentProps: {
            fileMax: 5,
        },
    },
    {
        label: '备注信息',
        field: 'remark',
        component: 'Input',
    },
    {
        label: '房间面积（㎡）',
        field: 'area',
        component: 'Input',
    },
    // TODO 主键隐藏字段，目前写死为ID
    {
        label: '',
        field: 'id',
        component: 'Input',
        show: false,
    },
];

// 高级查询数据
export const superQuerySchema = {
    roomId: { title: '房间号', order: 0, view: 'text', type: 'string' },
    layerNum: { title: '楼层号', order: 1, view: 'text', type: 'string' },
    isDecorated: { title: '是否装修', order: 2, view: 'number', type: 'number' },
    startTime: { title: '开始时间', order: 3, view: 'datetime', type: 'string' },
    endTime: { title: '结束时间', order: 4, view: 'datetime', type: 'string' },
    buildingType: { title: '关联楼栋表', order: 5, view: 'list', type: 'string', dictCode: 'building_type' },
    floorPlan: { title: '户型', order: 6, view: 'text', type: 'string' },
    images: { title: '预览图', order: 7, view: 'text', type: 'string' },
    remark: { title: '备注信息', order: 8, view: 'text', type: 'string' },
    area: { title: '房间面积（㎡）', order: 9, view: 'text', type: 'string' },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
    // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
    return formSchema;
}
