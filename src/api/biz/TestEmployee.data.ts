import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '姓名',
    align: "center",
    dataIndex: 'name'
  },
  {
    title: '员工年龄',
    align: "center",
    dataIndex: 'age'
  },
  {
    title: '员工生日',
    align: "center",
    dataIndex: 'birth',
    customRender:({text}) =>{
      text = !text ? "" : (text.length > 10 ? text.substr(0,10) : text);
      return text;
    },
  },
];

// 高级查询数据
export const superQuerySchema = {
  name: {title: '姓名',order: 0,view: 'text', type: 'string',},
  age: {title: '员工年龄',order: 1,view: 'number', type: 'number',},
  birth: {title: '员工生日',order: 2,view: 'date', type: 'string',},
};
