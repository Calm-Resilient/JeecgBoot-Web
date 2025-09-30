import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
   {
    title: '设备编号',
    align:"center",
    dataIndex: 'deviceCode'
   },
   {
    title: '设备名称',
    align:"center",
    dataIndex: 'deviceName'
   },
   {
    title: 'API接口地址',
    align:"center",
    dataIndex: 'url'
   },
   {
    title: '通信协议',
    align:"center",
    dataIndex: 'agreementdictText'
   },
   {
    title: '授权密钥',
    align:"center",
    dataIndex: 'appKey'
   },
   {
    title: '设备类型',
    align:"center",
    dataIndex: 'deviceTypedictText'
   },
   {
    title: '端口',
    align:"center",
    dataIndex: 'port'
   },
   {
    title: '请求方式',
    align:"center",
    dataIndex: 'requestType'
   },
   {
    title: '请求参数',
    align:"center",
    dataIndex: 'params'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "设备编号",
      field: 'deviceCode',
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "设备名称",
      field: 'deviceName',
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "通信协议",
      field: 'agreement',
      component: 'JSelectInput',
      componentProps:{
      },
      //colProps: {span: 6},
 	},
	{
      label: "设备类型",
      field: 'deviceType',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"device_type"
      },
      //colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '设备编号',
    field: 'deviceCode',
    component: 'Input',
  },
  {
    label: '设备名称',
    field: 'deviceName',
    component: 'Input',
  },
  {
    label: 'API接口地址',
    field: 'url',
    component: 'Input',
  },
  {
    label: '通信协议',
    field: 'agreement',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:""
     },
  },
  {
    label: '授权ID',
    field: 'appId',
    component: 'Input',
  },
  {
    label: '授权密钥',
    field: 'appKey',
    component: 'Input',
  },
  {
    label: '设备类型',
    field: 'deviceType',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"device_type"
     },
  },
  // {
  //   label: '端口',
  //   field: 'port',
  //   component: 'Input',
  // },
  {
    label: '请求方式',
    field: 'requestType',
    component: 'Input',
  },
  {
    label: '请求参数',
    field: 'params',
    component: 'InputTextArea',
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
  deviceCode: {title: '设备编号',order: 0,view: 'text', type: 'string',},
  deviceName: {title: '设备名称',order: 1,view: 'text', type: 'string',},
  url: {title: 'API接口地址',order: 2,view: 'text', type: 'string',},
  agreement: {title: '通信协议',order: 3,view: 'list', type: 'string',dictCode: '',},
  appKey: {title: '授权密钥',order: 5,view: 'text', type: 'string',},
  deviceType: {title: '设备类型',order: 6,view: 'list', type: 'string',dictCode: 'device_type',},
  port: {title: '端口',order: 7,view: 'text', type: 'string',},
  requestType: {title: '请求方式',order: 8,view: 'text', type: 'string',},
  params: {title: '请求参数',order: 9,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
