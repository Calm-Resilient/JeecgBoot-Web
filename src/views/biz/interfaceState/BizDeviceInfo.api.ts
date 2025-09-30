import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = '/biz/bizDeviceInfo/list',
  Edit = '/biz/bizDeviceInfo/edit',
  Delete = '/biz/bizDeviceInfo/delete',
  DeleteBatch = '/biz/bizDeviceInfo/deleteBatch',
  QueryById = '/biz/bizDeviceInfo/queryById',
  ExportXls = '/biz/bizDeviceInfo/exportXls',
  ImportXls = '/biz/bizDeviceInfo/importXls',
}

/**
 * 分页列表查询
 * @param params
 */
export const list = (params?: any) => defHttp.get({ url: Api.List, params });

/**
 * 保存或者更新（统一使用edit接口）
 * @param params 设备字段数据数组
 */
export const saveOrUpdate = (params: any[]) => {
  return defHttp.post({ url: Api.Edit, params });
};

/**
 * 删除单个
 * @param params
 */
export const deleteOne = (params: any, handleSuccess?: () => void) => {
  return defHttp.delete({ url: Api.Delete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess && handleSuccess();
  });
};

/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params: any, handleSuccess?: () => void) => {
  return defHttp.delete({ url: Api.DeleteBatch, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess && handleSuccess();
  });
};

/**
 * 根据id查询
 * @param params
 */
export const queryById = (params: any) => defHttp.get({ url: Api.QueryById, params });

/**
 * 导出excel
 * @param params
 */
export const getExportUrl = Api.ExportXls;

/**
 * 导入excel
 * @param params
 */
export const getImportUrl = Api.ImportXls;

/**
 * 根据设备ID查询设备字段数据
 * @param deviceId 设备ID
 */
export const queryByDeviceId = (deviceId: string) => {
  return defHttp.get({ url: Api.List, params: { deviceId } });
};

/**
 * 保存设备信息（批量保存字段）
 * @param params 设备字段数据数组
 */
export const saveDeviceInfo = (params: any[]) => {
  return defHttp.post({ url: Api.Edit, params });
};
