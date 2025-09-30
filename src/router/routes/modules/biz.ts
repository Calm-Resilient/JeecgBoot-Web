import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const biz: AppRouteModule = {
  path: '/biz',
  name: 'Biz',
  component: LAYOUT,
  redirect: '/biz/overall-info',
  meta: {
    orderNo: 10,
    icon: 'ion:business-outline',
    title: '业务管理',
  },
  children: [
    {
      path: 'overall-info',
      name: 'BizOverallInfo',
      component: () => import('/@/views/biz/BizOverallInfoList.vue'),
      meta: {
        title: '区域信息管理',
        icon: 'ion:location-outline',
      },
    },
    {
      path: 'interface-status',
      name: 'InterfaceStatus',
      component: () => import('/@/views/biz/interfaceState/InterfaceStatusManager.vue'),
      meta: {
        title: '接口管理',
        icon: 'ion:hardware-chip-outline',
      },
    },
  ],
};

export default biz;