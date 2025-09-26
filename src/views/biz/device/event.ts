import mitt from '/@/utils/mitt';

// 创建设备信息事件总线
export const deviceInfoEmitter = mitt();

// 定义事件类型
export const DeviceInfoEvents = {
  // 刷新设备类型列表
  RefreshDeviceTypeList: 'refreshDeviceTypeList',
  // 刷新当前设备数据
  RefreshCurrentDeviceData: 'refreshCurrentDeviceData',
  // 设备字段更新
  DeviceFieldUpdated: 'deviceFieldUpdated',
  // 设备字段删除
  DeviceFieldDeleted: 'deviceFieldDeleted',
} as const;
