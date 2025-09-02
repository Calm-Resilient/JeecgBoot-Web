import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '叠合板id',
    align: "center",
    dataIndex: 'slabId'
  },
  {
    title: '0未安装 1已安装',
    align: "center",
    dataIndex: 'isInstalled'
  },
  {
    title: '安装时间',
    align: "center",
    dataIndex: 'installTime'
  },
  {
    title: '楼栋号',
    align: "center",
    dataIndex: 'buildingType'
  },
];

// 高级查询数据
export const superQuerySchema = {
  slabId: {title: '叠合板id',order: 0,view: 'text', type: 'string',},
  isInstalled: {title: '0未安装 1已安装',order: 1,view: 'number', type: 'number',},
  installTime: {title: '安装时间',order: 2,view: 'datetime', type: 'string',},
  buildingType: {title: '楼栋号',order: 3,view: 'text', type: 'string',},
};
