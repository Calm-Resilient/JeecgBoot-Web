import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface CategoryItem {
  key: string;
  title: string;
  icon?: string | null;
  parentId: string;
  value?: string | null;
  code: string;
  children?: CategoryItem[] | null;
  leaf?: boolean;
}

export interface FieldItem {
  id?: string | null;                // 主键 - 对应后台 id (TableId)
  progressType: string;              // 流程类型字典code - 对应后台 progressType
  titleCategory: string;             // 小标题分类 - 对应后台 titleCategory
  fieldConfig: string;               // 字段名字 - 对应后台 fieldConfig
  fieldContent: string;              // 字段内容 - 对应后台 fieldContent
  isNew?: boolean;                   // 前端标记是否为新添加的字段(非后台字段)
  updateTime?: string | null;        // 更新时间
}

export const virtualBuildStore = defineStore('virtualBuild', () => {
  // 当前选中的路由分类
  const selectedCategory = ref<string>('');
  const selectedCategoryCode = ref<string>('');
  
  // 当前路由的子分类列表
  const currentSubCategories = ref<CategoryItem[]>([]);
  
  // 所有路由分类列表
  const categoryList = ref<CategoryItem[]>([]);
  
  // 当前路由下的所有字段数据，按titleCategory分组
  const currentFieldsData = ref<FieldItem[]>([]);
  
  // 更新选中的路由分类
  const updateSelectedCategory = (category: string, code: string) => {
    selectedCategory.value = category;
    selectedCategoryCode.value = code;
  };
  
  // 更新当前路由的子分类列表
  const updateCurrentSubCategories = (categories: CategoryItem[]) => {
    currentSubCategories.value = categories;
  };
  
  // 更新所有路由分类列表
  const updateCategoryList = (list: CategoryItem[]) => {
    categoryList.value = list;
  };
  
  // 更新当前路由下的字段数据
  const updateCurrentFieldsData = (data: FieldItem[]) => {
    currentFieldsData.value = data;
  };
  
  // 添加新的字段
  const addField = (field: FieldItem) => {
    currentFieldsData.value.push(field);
  };
  
  // 更新字段
  const updateField = (index: number, field: FieldItem) => {
    if (index >= 0 && index < currentFieldsData.value.length) {
      currentFieldsData.value[index] = field;
    }
  };
  
  // 删除字段
  const removeField = (index: number) => {
    if (index >= 0 && index < currentFieldsData.value.length) {
      currentFieldsData.value.splice(index, 1);
    }
  };
  
  return {
    selectedCategory,
    selectedCategoryCode,
    currentSubCategories,
    categoryList,
    currentFieldsData,
    updateSelectedCategory,
    updateCurrentSubCategories,
    updateCategoryList,
    updateCurrentFieldsData,
    addField,
    updateField,
    removeField
  };
});
