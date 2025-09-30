import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getDeviceListByType } from './InterfaceStatus.api';

export interface DeviceItem {
  id: string;
  deviceCode: string;
  deviceName: string;
  url: string;
  agreement: string;
  appId: string;
  appKey: string;
  deviceType: string;
  requestType: string;
  params: any;
  port: string;
  connectionStatus?: string; // '0'-离线，'1'-在线
  lastConnectionTime?: string;
  responseTime?: number;
  updateFrequency?: number;
  returnInfo?: string;
}

export interface DeviceTypeItem {
  value: string;
  text: string;
  code: string;
}

export const interfaceStatusStore = defineStore('interfaceStatus', () => {
  // 当前选中的设备类型
  const selectedDeviceType = ref<string>('');
  const selectedDeviceTypeName = ref<string>('');
  
  // 设备类型列表
  const deviceTypeList = ref<DeviceTypeItem[]>([]);
  
  // 当前设备类型下的设备列表
  const currentDeviceList = ref<DeviceItem[]>([]);
  
  // 加载状态
  const loading = ref<boolean>(false);
  
  // 搜索关键词
  const searchKeyword = ref<string>('');
  
  // 更新选中的设备类型
  const updateSelectedDeviceType = (type: string, name: string) => {
    selectedDeviceType.value = type;
    selectedDeviceTypeName.value = name;
  };
  
  // 更新设备类型列表
  const updateDeviceTypeList = (list: DeviceTypeItem[]) => {
    deviceTypeList.value = list;
  };
  
  // 更新当前设备列表
  const updateCurrentDeviceList = (list: DeviceItem[]) => {
    currentDeviceList.value = list;
  };
  
  // 加载设备列表
  const loadDeviceList = async (deviceType?: string) => {
    loading.value = true;
    try {
      // 直接传递deviceType参数，如果为空则调用所有设备接口
      const result = await getDeviceListByType(deviceType);
      
      if (result && result.records) {
        updateCurrentDeviceList(result.records);
      } else {
        updateCurrentDeviceList([]);
      }
    } catch (error) {
      console.error('加载设备列表失败:', error);
      updateCurrentDeviceList([]);
    } finally {
      loading.value = false;
    }
  };
  
  // 刷新当前设备列表
  const refreshDeviceList = () => {
    loadDeviceList(selectedDeviceType.value);
  };
  
  // 设置搜索关键词
  const setSearchKeyword = (keyword: string) => {
    searchKeyword.value = keyword;
  };
  
  // 获取过滤后的设备列表
  const getFilteredDeviceList = () => {
    if (!searchKeyword.value) {
      return currentDeviceList.value;
    }
    
    return currentDeviceList.value.filter(device => 
      device.deviceName.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      device.deviceCode.toLowerCase().includes(searchKeyword.value.toLowerCase())
    );
  };
  
  return {
    selectedDeviceType,
    selectedDeviceTypeName,
    deviceTypeList,
    currentDeviceList,
    loading,
    searchKeyword,
    updateSelectedDeviceType,
    updateDeviceTypeList,
    updateCurrentDeviceList,
    loadDeviceList,
    refreshDeviceList,
    setSearchKeyword,
    getFilteredDeviceList
  };
});
