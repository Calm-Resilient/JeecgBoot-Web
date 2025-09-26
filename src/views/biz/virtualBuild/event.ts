import mitt from '/@/utils/mitt';

// 创建虚拟建造事件总线
export const virtualBuildEmitter = mitt();

// 定义事件类型
export const VirtualBuildEvents = {
  // 刷新路由分类列表
  RefreshCategoryList: 'refreshCategoryList',
  // 刷新当前路由的子分类列表
  RefreshSubCategories: 'refreshSubCategories',
  // 刷新当前字段数据
  RefreshFieldsData: 'refreshFieldsData',
  // 字段更新
  FieldUpdated: 'fieldUpdated',
  // 字段删除
  FieldDeleted: 'fieldDeleted',
  // 添加自定义信息
  AddCustomField: 'addCustomField',
} as const;