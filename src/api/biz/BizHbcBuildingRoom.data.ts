import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '房间号',
    align: "center",
    dataIndex: 'roomId'
  },
  {
    title: '楼层号',
    align: "center",
    dataIndex: 'layerNum'
  },
  {
    title: '0false 1true  是否装修',
    align: "center",
    dataIndex: 'isDecorated'
  },
  {
    title: '开始时间',
    align: "center",
    dataIndex: 'startTime'
  },
  {
    title: '结束时间',
    align: "center",
    dataIndex: 'endTime'
  },
  {
    title: '关联楼栋表',
    align: "center",
    dataIndex: 'buildingType'
  },
];

// 高级查询数据
export const superQuerySchema = {
  roomId: {title: '房间号',order: 0,view: 'text', type: 'string',},
  layerNum: {title: '楼层号',order: 1,view: 'text', type: 'string',},
  isDecorated: {title: '0false 1true  是否装修',order: 2,view: 'number', type: 'number',},
  startTime: {title: '开始时间',order: 3,view: 'datetime', type: 'string',},
  endTime: {title: '结束时间',order: 4,view: 'datetime', type: 'string',},
  buildingType: {title: '关联楼栋表',order: 5,view: 'text', type: 'string',},
};
