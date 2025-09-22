import type { ProjectConfig } from '/#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
    ContentEnum,
    PermissionModeEnum,
    ThemeEnum,
    RouterTransitionEnum,
    SettingButtonPositionEnum,
    SessionTimeoutProcessingEnum,
    TabsThemeEnum,
} from '/@/enums/appEnum';
// ! 改动后需要清空浏览器缓存
const setting: ProjectConfig = {
    // 你的完整配置
    showSettingButton: true,
    showDarkModeToggle: true,
    settingButtonPosition: SettingButtonPositionEnum.AUTO, // 对应 "auto"
    permissionMode: PermissionModeEnum.BACK,
    permissionCacheType: CacheTypeEnum.LOCAL, // 对应 1
    sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP, // 对应 0
    themeColor: "#1890ff",
    themeMode: ThemeEnum.LIGHT, // 对应 "light"
    grayMode: false,
    colorWeak: false,
    fullContent: false,
    contentMode: ContentEnum.FULL, // 对应 "full"
    showLogo: true,
    showFooter: false,
    aiIconShow: false,

    // 头部配置
    headerSetting: {
        bgColor: "#ffffff",
        fixed: true,
        show: true,
        theme: ThemeEnum.LIGHT,
        useLockPage: false,
        showFullScreen: false,
        showDoc: false,
        showNotice: true,
        showSearch: true
    },

    // 菜单配置
    menuSetting: {
        bgColor: "#ffffff",
        fixed: true,
        collapsed: false,
        collapsedShowTitle: false,
        canDrag: false,
        show: true,
        hidden: false,
        menuWidth: 300,
        mode: MenuModeEnum.INLINE, // 对应 "inline"
        type: MenuTypeEnum.SIDEBAR, // 对应 "sidebar"
        theme: ThemeEnum.LIGHT, // 对应 "light"
        isThemeBright: false,
        split: false,
        topMenuAlign: "center",
        trigger: TriggerEnum.HEADER, // 对应 "HEADER"
        accordion: true,
        closeMixSidebarOnChange: false,
        mixSideTrigger: MixSidebarTriggerEnum.CLICK, // 对应 "click"
        mixSideFixed: false
    },

    // 多标签配置
    multiTabsSetting: {
        cache: false,
        show: true,
        canDrag: true,
        showQuick: true,
        showRedo: true,
        showFold: true,
        theme: TabsThemeEnum.CARD // 对应 "card"
    },

    // 动画配置
    transitionSetting: {
        enable: true,
        basicTransition: RouterTransitionEnum.FADE_SIDE, // 对应 "fade-slide"
        openPageLoading: true,
        openNProgress: true
    },

    openKeepAlive: true,
    lockTime: 0,
    showBreadCrumb: true,
    showBreadCrumbIcon: true,
    useErrorHandle: false,
    useOpenBackTop: true,
    canEmbedIFramePage: true,
    closeMessageOnSwitch: true,
    removeAllHttpPending: false
};

export default setting;
