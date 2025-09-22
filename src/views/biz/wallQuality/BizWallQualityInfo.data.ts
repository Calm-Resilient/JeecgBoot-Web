import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

// 列表数据
export const columns: BasicColumn[] = [
  {
    title: '建筑类型',
    align:"center",
    dataIndex: 'buildingTypedictText'
  },
  {
    title: '当前楼层',
    align:"center",
    dataIndex: 'curLayer'
  },
  {
    title: '墙体/地板编号',
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
    title: '地板极差',
    align:"center",
    dataIndex: 'range'
   },
  {
    title: '检测时间',
    align:"center",
    dataIndex: 'inspectionTime',
    customRender: ({ text }) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
  },
  {
    title: '是否合格',
    align:"center",
    dataIndex: 'ispass',
    customRender: ({ text }) => {
      const statusMap = {
        '0': { text: '暂未确定', color: '#999999', bgColor: '#f5f5f5' },
        '1': { text: '合格', color: '#ffffff', bgColor: '#52c41a' },
        '2': { text: '不合格', color: '#ffffff', bgColor: '#ff4d4f' }
      };
      const status = statusMap[text] || { text: '未知', color: '#ffffff', bgColor: '#d9d9d9' };

      // ✅ 返回 VNode，而不是字符串
      return h(
        'span',
        {
          style: {
            color: status.color,
            backgroundColor: status.bgColor,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
          }
        },
        status.text
      );
    }
  },
];

// 查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "建筑类型",
    field: 'buildingType',
    component: 'JSelectMultiple',
    componentProps:{
      dictCode: "building_type"
    },
  },
  {
    label: "当前楼层",
    field: 'curLayer',
    component: 'InputNumber',
  },
  {
    label: "类型",
    field: 'type',
    component: 'JDictSelectTag',
    componentProps:{
      options: [
        { value: '1', label: '墙体' },
        { value: '0', label: '地板' }
      ]
    },
  },
  {
    label: "墙体编号",
    field: 'wallId',
    component: 'Input',
  },
  {
    label: "区域编号",
    field: 'areaId',
    component: 'Input',
  },
];

// 表单数据 - 表单中不需要是否合格字段，表格中显示彩色按钮
export const formSchema: FormSchema[] = [
  {
    label: '建筑类型',
    field: 'buildingType',
    component: 'JDictSelectTag',
    componentProps:{
      dictCode:"building_type"
    },
  },
  {
    label: '当前楼层',
    field: 'curLayer',
    component: 'InputNumber',
  },
  {
    label: '墙体/地板编号',
    field: 'wallId',
    component: 'Input',
  },
  {
    label: '区域编号',
    field: 'areaId',
    component: 'Input',
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
    label: '地板极差',
    field:"range",
    component: 'Input'
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
    label: '是否合格',
    field: 'ispass',
    component: 'JDictSelectTag',
    componentProps:{
        dictCode:"",
        options: [
          { value: '0', label: '暂未确定' },
          { value: '1', label: '合格' },
          { value: '2', label: '不合格' }
        ]
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
  buildingType: {title: '建筑类型',order: 0,view: 'list', type: 'string',dictCode: 'building_type',},
  curLayer: {title: '当前楼层',order: 1,view: 'number', type: 'number',},
  wallId: {title: '墙体编号',order: 2,view: 'text', type: 'string',},
  areaId: {title: '区域编号',order: 3,view: 'text', type: 'string',},
  faceAVerticalScore: {title: 'A面垂直度得分',order: 4,view: 'text', type: 'string',},
  faceAFlatnessScore: {title: 'A面平整度得分',order: 5,view: 'text', type: 'string',},
  faceBVerticalScore: {title: 'B面垂直度得分',order: 6,view: 'text', type: 'string',},
  faceBFlatnessScore: {title: 'B面平整度得分',order: 7,view: 'text', type: 'string',},
  inspectionTime: {title: '检测时间',order: 8,view: 'date', type: 'string',},
  ispass: {title: '是否合格',order: 9,view: 'list', type: 'string',dictCode: '', options: [
    { value: '0', label: '暂未确定' },
    { value: '1', label: '合格' },
    { value: '2', label: '不合格' }
  ]},
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
