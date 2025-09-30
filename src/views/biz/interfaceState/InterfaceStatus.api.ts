import { defHttp } from '/@/utils/http/axios';

enum Api {
  list = '/biz/bizInterfaceInfo/list',
  save = '/biz/bizInterfaceInfo/add',
  edit = '/biz/bizInterfaceInfo/edit',
  deleteOne = '/biz/bizInterfaceInfo/delete',
  deleteBatch = '/biz/bizInterfaceInfo/deleteBatch',
  importExcel = '/biz/bizInterfaceInfo/importExcel',
  exportXls = '/biz/bizInterfaceInfo/exportXls',
  testConnection = '/biz/bizInterfaceInfo/testConnection',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;

/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({ url: Api.list, params });

/**
 * 根据设备类型查询设备列表
 * @param deviceType 设备类型，为空时查询所有设备
 */
export const getDeviceListByType = (deviceType?: string) => {
  const params = deviceType ? { deviceType } : {};
  return defHttp.get({ url: Api.list, params });
};

/**
 * 根据设备编号查询设备详情
 * @param deviceCode 设备编号
 */
export const getDeviceDetailByCode = (deviceCode: string) => {
  return defHttp.get({ url: Api.list, params: { deviceCode } });
};

/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

/**
 * 测试连接
 * @param deviceCode 设备编号
 * @param deviceType 设备类型
 */
export const testConnection = (deviceCode: string, deviceType: string) => {
  return defHttp.get({ 
    url: Api.testConnection, 
    params: { deviceCode, deviceType } 
  });
};