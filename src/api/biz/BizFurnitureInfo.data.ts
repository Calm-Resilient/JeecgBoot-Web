import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '颜色描述',
    align: "center",
    dataIndex: 'color'
  },
  {
    title: '家具名称',
    align: "center",
    dataIndex: 'name'
  },
  {
    title: '厂家或者xx厂家，默认厂家',
    align: "center",
    dataIndex: 'factory'
  },
  {
    title: '家具图片',
    align: "center",
    dataIndex: 'imageString'
  },
  {
    title: '位置描述',
    align: "center",
    dataIndex: 'area'
  },
  {
    title: '规格描述',
    align: "center",
    dataIndex: 'spec'
  },
  {
    title: '特殊项描述',
    align: "center",
    dataIndex: 'special'
  },
];

// 高级查询数据
export const superQuerySchema = {
  color: {title: '颜色描述',order: 0,view: 'text', type: 'string',},
  name: {title: '家具名称',order: 1,view: 'text', type: 'string',},
  factory: {title: '厂家或者xx厂家，默认厂家',order: 2,view: 'text', type: 'string',},
  image: {title: '家具图片',order: 3,view: 'text', type: 'string',},
  area: {title: '位置描述',order: 4,view: 'text', type: 'string',},
  spec: {title: '规格描述',order: 5,view: 'text', type: 'string',},
  special: {title: '特殊项描述',order: 6,view: 'text', type: 'string',},
};
