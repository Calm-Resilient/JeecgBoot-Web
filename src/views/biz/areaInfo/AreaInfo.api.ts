import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

enum Api {
    list = '/biz/hbc/bizOverallInfo/list',
    content = '/biz/hbc/bizOverallInfo/queryByName',
    save = '/biz/hbc/bizOverallInfo/add',
    // edit='/biz/bizFurnitureInfo/edit',
    // deleteOne = '/biz/bizFurnitureInfo/delete',
    // deleteBatch = '/biz/bizFurnitureInfo/deleteBatch',
    // importExcel = '/biz/bizFurnitureInfo/importExcel',
    // exportXls = '/biz/bizFurnitureInfo/exportXls',
}

// /**
//  * 导出api
//  * @param params
//  */
// export const getExportUrl = Api.exportXls;
//
// /**
//  * 导入api
//  */
// export const getImportUrl = Api.importExcel;

/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
export const queryContent = (params) => defHttp.get({ url: Api.content, params });
export const saveContent = (payload) => {
    return defHttp.post({
        url: Api.save,
        data: payload, // 用 data 才会以 JSON 发送到后端
    });
};

// /**
//  * 删除单个
//  * @param params
//  * @param handleSuccess
//  */
// export const deleteOne = (params,handleSuccess) => {
//     return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
//         handleSuccess();
//     });
// }
//
// /**
//  * 批量删除
//  * @param params
//  * @param handleSuccess
//  */
// export const batchDelete = (params, handleSuccess) => {
//     createConfirm({
//         iconType: 'warning',
//         title: '确认删除',
//         content: '是否删除选中数据',
//         okText: '确认',
//         cancelText: '取消',
//         onOk: () => {
//             return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
//                 handleSuccess();
//             });
//         }
//     });
// }
//
// /**
//  * 保存或者更新
//  * @param params
//  * @param isUpdate
//  */
// export const saveOrUpdate = (params, isUpdate) => {
//     let url = isUpdate ? Api.edit : Api.save;
//     return defHttp.post({ url: url, params }, { isTransformResponse: false });
// }
