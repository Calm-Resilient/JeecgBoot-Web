import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';

//列表数据
export const columns: BasicColumn[] = [
   {
    title: '颜色描述',
    align:"center",
    dataIndex: 'color'
   },
   {
    title: '家具名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '楼栋号',
    align:"center",
    dataIndex: 'buildingTypedictText'
   },
   {
    title: '楼层',
    align:"center",
    dataIndex: 'layerNum'
   },
   {
    title: '厂家描述',
    align:"center",
    dataIndex: 'factory'
   },
   {
    title: '家具图片',
    align:"center",
    customRender: render.renderImage,   // 直接调用
    dataIndex: 'image'
   },
   {
    title: '位置描述',
    align:"center",
    dataIndex: 'area'
   },
   {
    title: '规格描述',
    align:"center",
    dataIndex: 'spec'
   },
   {
    title: '特殊项描述',
    align:"center",
    dataIndex: 'special'
   },
   {
    title: '家具类型',
    align:"center",
    dataIndex: 'furniture'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "家具名称",
      field: 'name',
      component: 'Input',
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
      label: "楼层",
      field: 'layerNum',
      component: 'Input',
      //colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '颜色描述',
    field: 'color',
    component: 'Input',
  },
  {
    label: '家具名称',
    field: 'name',
    component: 'Input',
  },
  {
    label: '楼栋号',
    field: 'buildingType',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"building_type"
     },
  },
  {
    label: '楼层',
    field: 'layerNum',
    component: 'Input',
  },
  {
    label: '厂家描述',
    field: 'factory',
    component: 'Input',
  },
  {
    label: '家具图片',
    field: 'image',
    componentProps:{
        fileMax: 10,
    },
    component: 'JImageUpload',
  },
  {
    label: '位置描述',
    field: 'area',
    component: 'Input',
  },
  {
    label: '规格描述',
    field: 'spec',
    component: 'Input',
  },
  {
    label: '特殊项描述',
    field: 'special',
    component: 'Input',
  },
  {
    label: '家具类型',
    field: 'furniture',
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
  color: {title: '颜色描述',order: 0,view: 'text', type: 'string',},
  name: {title: '家具名称',order: 1,view: 'text', type: 'string',},
  buildingType: {title: '楼栋号',order: 2,view: 'list', type: 'string',dictCode: '',},
  layerNum: {title: '楼层',order: 3,view: 'text', type: 'string',},
  factory: {title: '厂家描述',order: 4,view: 'text', type: 'string',},
  image: {title: '家具图片',order: 5,view: 'text', type: 'string',},
  area: {title: '位置描述',order: 6,view: 'text', type: 'string',},
  spec: {title: '规格描述',order: 7,view: 'text', type: 'string',},
  special: {title: '特殊项描述',order: 8,view: 'text', type: 'string',},
  furniture: {title: '家具类型',order: 9,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
