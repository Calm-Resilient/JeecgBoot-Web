import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '建筑类型',
    align:"center",
    dataIndex: 'buildingtype'
   },
   {
    title: '当前楼层',
    align:"center",
    dataIndex: 'curlayer'
   },
   {
    title: '墙体编号',
    align:"center",
    dataIndex: 'wallId'
   },
   {
    title: '区域编号',
    align:"center",
    dataIndex: 'areaId'
   },
   {
    title: 'A面垂直度得分',
    align:"center",
    dataIndex: 'faceAVerticalScore'
   },
   {
    title: 'A面平整度得分',
    align:"center",
    dataIndex: 'faceAFlatnessScore'
   },
   {
    title: 'B面垂直度得分',
    align:"center",
    dataIndex: 'faceBVerticalScore'
   },
   {
    title: 'B面平整度得分',
    align:"center",
    dataIndex: 'faceBFlatnessScore'
   },
   {
    title: '检测时间',
    align:"center",
    dataIndex: 'inspectionTime',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
   {
    title: '创建时间',
    align:"center",
    dataIndex: 'createdAt',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
   {
    title: '更新时间',
    align:"center",
    dataIndex: 'updatedAt',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '建筑类型',
    field: 'buildingtype',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入建筑类型!'},
          ];
     },
  },
  {
    label: '当前楼层',
    field: 'curlayer',
    component: 'InputNumber',
  },
  {
    label: '墙体编号',
    field: 'wallId',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入墙体编号!'},
          ];
     },
  },
  {
    label: '区域编号',
    field: 'areaId',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入区域编号!'},
          ];
     },
  },
  {
    label: 'A面垂直度得分',
    field: 'faceAVerticalScore',
    component: 'Input',
  },
  {
    label: 'A面平整度得分',
    field: 'faceAFlatnessScore',
    component: 'Input',
  },
  {
    label: 'B面垂直度得分',
    field: 'faceBVerticalScore',
    component: 'Input',
  },
  {
    label: 'B面平整度得分',
    field: 'faceBFlatnessScore',
    component: 'Input',
  },
  {
    label: '检测时间',
    field: 'inspectionTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
  },
  {
    label: '创建时间',
    field: 'createdAt',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入创建时间!'},
          ];
     },
  },
  {
    label: '更新时间',
    field: 'updatedAt',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入更新时间!'},
          ];
     },
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
  buildingtype: {title: '建筑类型',order: 0,view: 'text', type: 'string',},
  curlayer: {title: '当前楼层',order: 1,view: 'number', type: 'number',},
  wallId: {title: '墙体编号',order: 2,view: 'text', type: 'string',},
  areaId: {title: '区域编号',order: 3,view: 'text', type: 'string',},
  faceAVerticalScore: {title: 'A面垂直度得分',order: 4,view: 'text', type: 'string',},
  faceAFlatnessScore: {title: 'A面平整度得分',order: 5,view: 'text', type: 'string',},
  faceBVerticalScore: {title: 'B面垂直度得分',order: 6,view: 'text', type: 'string',},
  faceBFlatnessScore: {title: 'B面平整度得分',order: 7,view: 'text', type: 'string',},
  inspectionTime: {title: '检测时间',order: 8,view: 'date', type: 'string',},
  createdAt: {title: '创建时间',order: 9,view: 'date', type: 'string',},
  updatedAt: {title: '更新时间',order: 10,view: 'date', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}