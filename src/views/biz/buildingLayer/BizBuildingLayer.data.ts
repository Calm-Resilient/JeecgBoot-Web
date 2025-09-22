import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '楼层',
    align:"center",
    sorter: true,
    dataIndex: 'count'
   },
  {
    title: '状态',
    align:"center",
    dataIndex: 'statedictText'
  },
   {
    title: '计划开始时间',
    align:"center",
    dataIndex: 'planStartTime',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
   {
    title: '计划结束时间',
    align:"center",
    dataIndex: 'planEndTime',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
   {
    title: '实际开始时间',
    align:"center",
    dataIndex: 'buildStartTime',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
   {
    title: '实际结束时间',
    align:"center",
    dataIndex: 'buildEndTime',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
   {
    title: '装修开始时间',
    align:"center",
    dataIndex: 'fitmentStartTime',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
   {
    title: '装修结束时间',
    align:"center",
    dataIndex: 'fitmentEndTime',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
   },
   {
    title: '楼栋号',
    align:"center",
    dataIndex: 'buildingTypedictText'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "状态",
      field: 'state',
      component: 'JSelectMultiple',
      componentProps:{
        dictCode: "building_status"  // 设置正确的字典编码
      },
      //colProps: {span: 6},
 	},
	{
      label: "楼栋编号",
      field: 'buildingType',
      component: 'JSelectMultiple',
      componentProps:{
        dictCode: "building_type"  // 设置正确的字典编码
      },
      //colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '楼层',
    field: 'count',
    component: 'InputNumber',
  },
  {
    label: '状态',
    field: 'state',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"building_status"  // 设置正确的字典编码
     },
  },
  {
    label: '计划开始时间',
    field: 'planStartTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
  },
  {
    label: '计划结束时间',
    field: 'planEndTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
  },
  {
    label: '实际开始时间',
    field: 'buildStartTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
  },
  {
    label: '实际结束时间',
    field: 'buildEndTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
  },
  {
    label: '装修开始时间',
    field: 'fitmentStartTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
  },
  {
    label: '装修结束时间',
    field: 'fitmentEndTime',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
  },
  {
    label: '楼栋编号',
    field: 'buildingType',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"building_type"  // 设置正确的字典编码
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
  count: {title: '楼层',order: 0,view: 'number', type: 'number',},
  state: {title: '状态',order: 1,view: 'list', type: 'string',dictCode: 'building_status',},
  planStartTime: {title: '计划开始时间',order: 2,view: 'date', type: 'string',},
  planEndTime: {title: '计划结束时间',order: 3,view: 'date', type: 'string',},
  buildStartTime: {title: '实际开始时间',order: 4,view: 'date', type: 'string',},
  buildEndTime: {title: '实际结束时间',order: 5,view: 'date', type: 'string',},
  fitmentStartTime: {title: '装修开始时间',order: 6,view: 'date', type: 'string',},
  fitmentEndTime: {title: '装修结束时间',order: 7,view: 'date', type: 'string',},
  buildingType: {title: '楼栋号',order: 8,view: 'list', type: 'string',dictCode: 'building_type',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}