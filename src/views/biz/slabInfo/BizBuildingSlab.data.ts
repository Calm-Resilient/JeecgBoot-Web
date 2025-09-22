import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '叠合板编号',
    align:"center",
    dataIndex: 'slabId'
   },
   {
    title: '是否安装',
    align:"center",
    dataIndex: 'isInstalled',
    customRender: ({ text }) => {
        const map: Record<string, string> = {
            '0': '未安装',
            '1': '已安装',
        };
        const key = String(text);
        return map[key] ?? '';
    },
   },
   {
    title: '安装时间',
    align:"center",
    dataIndex: 'installTime'
   },
   {
    title: '楼栋号',
    align:"center",
    dataIndex: 'buildingTypedictText'
   },
   {
    title: '楼层（层）',
    align:"center",
    dataIndex: 'layerNum'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "叠合板编号",
    field: "slabId",
    component: 'JInput',
  },
	{
      label: "是否安装",
      field: 'isInstalled',
      component: 'JSelectMultiple',
      componentProps:{
            options: [
                { value: 0, label: '未安装' },
                { value: 1, label: '已安装' },
            ]
      },
      //colProps: {span: 6},
 	},
	{
      label: "楼栋号",
      field: 'buildingType',
      component: 'JSelectMultiple',
      componentProps:{
        dictCode:"building_type"
      },
      //colProps: {span: 6},
 	},
	{
      label: "楼层（层）",
      field: 'layerNum',
      component: 'InputNumber',
      //colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '叠合板编号',
    field: 'slabId',
    component: 'Input',
  },
  {
    label: '是否安装',
    field: 'isInstalled',
    component: 'JDictSelectTag',
    componentProps: {
        options: [
    
            { value: 0, label: '未装修' },
            { value: 1, label: '已装修' },
        ]
    },
  },
  {
    label: '安装时间',
    field: 'installTime',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '楼栋号',
    field: 'buildingType',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:""
     },
  },
  {
    label: '楼层（层）',
    field: 'layerNum',
    component: 'InputNumber',
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
  slabId: {title: '叠合板编号',order: 0,view: 'text', type: 'string',},
  isInstalled: {title: '0未安装 1已安装',order: 1,view: 'number', type: 'number',dictCode: '',},
  installTime: {title: '安装时间',order: 2,view: 'datetime', type: 'string',},
  buildingType: {title: '楼栋号',order: 3,view: 'list', type: 'string',dictCode: '',},
  layerNum: {title: '楼层（层）',order: 4,view: 'number', type: 'number',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}