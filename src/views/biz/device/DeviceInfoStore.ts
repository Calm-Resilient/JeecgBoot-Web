import { defineStore } from 'pinia';
import { ref } from 'vue';

export const deviceInfoStore = defineStore('deviceInfo', () => {
  // 当前选中的设备类型
  const selectedDeviceType = ref<string>('');
  
  // 当前设备类型的所有字段数据
  const currentDeviceData = ref<any[]>([]);
  
  // 设备类型列表（用于左侧导航）
  const deviceTypeList = ref<any[]>([]);
  
  // 更新选中的设备类型
  const updateSelectedDeviceType = (deviceType: string) => {
    selectedDeviceType.value = deviceType;
  };
  
  // 更新当前设备数据
  const updateCurrentDeviceData = (data: any[]) => {
    currentDeviceData.value = data;
  };
  
  // 更新设备类型列表
  const updateDeviceTypeList = (list: any[]) => {
    deviceTypeList.value = list;
  };
  
  // 添加新的设备字段
  const addDeviceField = (field: any) => {
    currentDeviceData.value.push(field);
  };
  
  // 更新设备字段
  const updateDeviceField = (index: number, field: any) => {
    if (index >= 0 && index < currentDeviceData.value.length) {
      currentDeviceData.value[index] = field;
    }
  };
  
  // 删除设备字段
  const removeDeviceField = (index: number) => {
    if (index >= 0 && index < currentDeviceData.value.length) {
      currentDeviceData.value.splice(index, 1);
    }
  };
  
  return {
    selectedDeviceType,
    currentDeviceData,
    deviceTypeList,
    updateSelectedDeviceType,
    updateCurrentDeviceData,
    updateDeviceTypeList,
    addDeviceField,
    updateDeviceField,
    removeDeviceField
  };
});
