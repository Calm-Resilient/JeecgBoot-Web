import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '建筑物类型',
    align:"center",
    dataIndex: 'buildingType'
   },
   {
    title: '配置信息',
    align:"center",
    dataIndex: 'configType'
   },
   {
    title: '信息展示内容',
    align:"center",
    dataIndex: 'displayContent'
   },
   {
    title: '备注',
    align:"center",
    dataIndex: 'remask'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '建筑物类型',
    field: 'buildingType',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入建筑物类型!'},
          ];
     },
  },
  {
    label: '配置信息',
    field: 'configType',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入配置信息!'},
          ];
     },
  },
  {
    label: '信息展示内容',
    field: 'displayContent',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remask',
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
  buildingType: {title: '建筑物类型',order: 0,view: 'text', type: 'string',},
  configType: {title: '配置信息',order: 1,view: 'text', type: 'string',},
  displayContent: {title: '信息展示内容',order: 2,view: 'text', type: 'string',},
  remask: {title: '备注',order: 3,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}