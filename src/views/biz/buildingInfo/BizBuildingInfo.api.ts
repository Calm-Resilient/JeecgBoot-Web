import {defHttp} from '/@/utils/http/axios';

enum Api {
  list = '/biz/bizBuildingInfo/list',
  save='/biz/bizBuildingInfo/add',
  edit='/biz/bizBuildingInfo/edit',
  deleteOne = '/biz/bizBuildingInfo/delete',
  deleteBatch = '/biz/bizBuildingInfo/deleteBatch',
  importExcel = '/biz/bizBuildingInfo/importExcel',
  exportXls = '/biz/bizBuildingInfo/exportXls',
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
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}

/**
 * 保存楼栋信息
 * @param data
 */
export const saveBuildingInfo = (data) => {
  return defHttp.post({
    url: Api.edit,
    data: data
  });
}