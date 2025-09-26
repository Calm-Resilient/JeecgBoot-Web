import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '楼号',
    align:"center",
    dataIndex: 'buildingType'
   },
   {
    title: '文件',
    align:"center",
    dataIndex: 'files'
   },
   {
    title: '总层数',
    align:"center",
    dataIndex: 'totalLayer'
   },
   {
    title: '当前层数',
    align:"center",
    dataIndex: 'builtLayer'
   },
   {
    title: '设计高度（米）',
    align:"center",
    dataIndex: 'designHeight'
   },
   {
    title: '施工高度（米）',
    align:"center",
    dataIndex: 'height'
   },
   {
    title: '楼栋负责工长',
    align:"center",
    dataIndex: 'manager'
   },
   {
    title: '联系电话',
    align:"center",
    dataIndex: 'phone'
   },
   {
    title: '当前施工步骤字典',
    align:"center",
    dataIndex: 'stepType'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '楼号',
    field: 'buildingType',
    component: 'Input',
  },
  
  {
    label: '总层数',
    field: 'totalLayer',
    component: 'InputNumber',
  },
  {
    label: '当前层数',
    field: 'builtLayer',
    component: 'InputNumber',
  },
  {
    label: '设计高度（米）',
    field: 'designHeight',
    component: 'InputNumber',
  },
  {
    label: '施工高度（米）',
    field: 'height',
    component: 'InputNumber',
  },
  {
    label: '楼栋负责工长',
    field: 'manager',
    component: 'Input',
  },
  {
    label: '联系电话',
    field: 'phone',
    component: 'Input',
  },
  {
    label: '文件',
    field: 'files',
    component: 'JUpload',
    componentProps: {
      fileType: 'file',
      maxCount: 5,
      multiple: false,
      text: '上传文件'
    },
  },
  {
    label: '当前施工步骤字典',
    field: 'stepType',
    component: 'Input',
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];

// 高级查询数据
export const superQuerySchema = {
  buildingType: {title: '楼号',order: 0,view: 'text', type: 'string',},
  totalLayer: {title: '总层数',order: 1,view: 'number', type: 'number',},
  builtLayer: {title: '当前层数',order: 2,view: 'number', type: 'number',},
  designHeight: {title: '设计高度（米）',order: 3,view: 'number', type: 'number',},
  height: {title: '施工高度（米）',order: 4,view: 'number', type: 'number',},
  manager: {title: '楼栋负责工长',order: 5,view: 'text', type: 'string',},
  phone: {title: '联系电话',order: 6,view: 'text', type: 'string',},
  stepType: {title: '当前施工步骤字典',order: 7,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
