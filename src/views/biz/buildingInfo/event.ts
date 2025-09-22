import mitt from '/@/utils/mitt';

export const buildingInfoEmitter = mitt();

export enum BuildingInfoEvents {
    RefreshBuildingList = 'buildingInfo:refreshList',
}
