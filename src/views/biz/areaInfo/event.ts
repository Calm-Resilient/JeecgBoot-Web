import mitt from '/@/utils/mitt';

export const areaInfoEmitter = mitt();

export enum AreaInfoEvents {
    RefreshAreaList = 'areaInfo:refreshList',
}


