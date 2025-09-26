import { defHttp } from '/@/utils/http/axios';
import { CategoryItem, FieldItem } from './VirtualBuildStore';

enum Api {
  LoadTreeData = '/sys/category/loadTreeData',
  List = '/biz/bizVirtualBuild/list',
  Edit = '/biz/bizVirtualBuild/edit',
  Save = '/biz/bizVirtualBuild/add',
  Delete = '/biz/bizVirtualBuild/delete',
  DeleteBatch = '/biz/bizVirtualBuild/deleteBatch',
  QueryById = '/biz/bizVirtualBuild/queryById',
}

/**
 * 加载路由分类树
 * @param pcode 父级编码
 */
export const loadTreeData = (pcode: string) => {
  return defHttp.get<CategoryItem[]>({ url: Api.LoadTreeData, params: { pcode } });
};

/**
 * 获取虚拟建造数据列表
 * @param progressType 进度类型编码
 */
export const getVirtualBuildList = (progressType: string) => {
  return defHttp.get({ url: Api.List, params: { progressType } });
};

/**
 * 保存或更新虚拟建造数据
 * @param params 字段数据
 */
export const saveOrUpdate = (params: FieldItem) => {
  return defHttp.post({ url: Api.Edit, params });
};

/**
 * 新增虚拟建造数据（严格映射后端要求的 snake_case 字段）
 * 仅用于“添加自定义信息”弹窗
 */
export const saveField = (params: FieldItem) => {
  // 后端实体 BizVirtualBuild 期望驼峰字段并以 JSON 对象接收
  const payload: Record<string, any> = {
    progressType: String(params.progressType ?? '').trim(),
    titleCategory: String(params.titleCategory ?? '').trim(),
    fieldConfig: String(params.fieldConfig ?? '').trim(),
    fieldContent: String(params.fieldContent ?? '').trim(),
  };
  if (params.id != null) payload.id = params.id;
  return defHttp.post({ url: Api.Save, data: payload });
};

/**
 * 批量保存或更新虚拟建造数据
 * @param params 字段数据数组
 */
export const batchSaveOrUpdate = (params: FieldItem[]) => {
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
 * 根据progressType查询虚拟建造数据
 * @param progressType 进度类型编码
 */
export const queryByProgressType = (progressType: string) => {
  return defHttp.get({ url: Api.List, params: { progressType } });
};
