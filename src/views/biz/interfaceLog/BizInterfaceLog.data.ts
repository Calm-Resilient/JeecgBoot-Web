import { h } from 'vue';
import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '请求地址',
    align:"center",
    dataIndex: 'url'
   },
   {
    title: '请求时间',
    align:"center",
    dataIndex: 'requestTime'
   },
   {
    title: '设备名字',
    align:"center",
    dataIndex: 'deviceName'
   },
   {
    title: '设备编号',
    align:"center",
    dataIndex: 'deviceCode'
   },
   {
    title: '响应信息',
    align:"center",
    dataIndex: 'response'
   },
   {
    title: '是否成功',
    align:"center",
    dataIndex: 'isSuccess',
    customRender: ({ text }) => {
      const statusMap = {
        '0': { text: '失败', color: '#ffffff', bgColor: '#ff4d4f' },
        '1': { text: '成功', color: '#ffffff', bgColor: '#52c41a' }
      };
      const status = statusMap[text] || { text: '未知', color: '#ffffff', bgColor: '#d9d9d9' };

      // 返回 VNode，而不是字符串
      return h(
        'span',
        {
          style: {
            color: status.color,
            backgroundColor: status.bgColor,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            display: 'inline-block'
          }
        },
        status.text
      );
    }
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
     {
      label: "请求时间",
      field: "requestTime",
      component: 'RangePicker',
      componentProps: {
          valueType: 'Date',
          showTime:true
      },
      //colProps: {span: 6},
	},
	{
      label: "设备名字",
      field: 'deviceName',
      component: 'Input',
      //colProps: {span: 6},
 	},
	{
      label: "是否成功",
      field: 'isSuccess',
      component: 'Select',
      componentProps: {
        options: [
          { label: '成功', value: '1' },
          { label: '失败', value: '0' }
        ],
        placeholder: '请选择'
      },
      //colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '请求地址',
    field: 'url',
    component: 'Input',
  },
  {
    label: '请求时间',
    field: 'requestTime',
    component: 'DatePicker',
    componentProps: {
       showTime: true,
       valueFormat: 'YYYY-MM-DD HH:mm:ss'
     },
  },
  {
    label: '设备名字',
    field: 'deviceName',
    component: 'Input',
  },
  {
    label: '设备编号',
    field: 'deviceCode',
    component: 'Input',
  },
  {
    label: '响应信息',
    field: 'response',
    component: 'InputTextArea',
    componentProps: {
      rows: 6,
      placeholder: '请输入响应信息'
    },
  },
  {
    label: '是否成功',
    field: 'isSuccess',
    component: 'Select',
    componentProps: {
      options: [
        { label: '成功', value: '1' },
        { label: '失败', value: '0' }
      ],
      disabled: true
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
  url: {title: '请求地址',order: 0,view: 'text', type: 'string',},
  requestTime: {title: '请求时间',order: 1,view: 'datetime', type: 'string',},
  deviceNameText: {title: '设备名字',order: 2,view: 'text', type: 'string',},
  deviceCode: {title: '设备编号',order: 3,view: 'text', type: 'string',},
  response: {title: '响应信息',order: 4,view: 'textarea', type: 'string',},
  isSuccess: {title: '是否成功',order: 5,view: 'text', type: 'string',},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
