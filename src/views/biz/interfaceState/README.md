# 接口状态管理模块

## 功能说明

这个模块实现了设备接口的状态管理功能，包括：

1. **左侧导航**：显示设备类型列表，基于字典 `device_type` 动态加载
2. **右侧内容**：显示设备卡片列表，支持网格和列表两种视图
3. **搜索功能**：支持按设备名称搜索
4. **连接测试**：支持测试设备连接状态
5. **详情查看**：支持查看设备详细信息

## 文件结构

```
src/views/biz/interfaceState/
├── InterfaceStatusManager.vue    # 主页面组件
├── InterfaceStatus.api.ts        # API接口定义
├── InterfaceStatusStore.ts       # 状态管理
├── components/
│   ├── Header.vue               # 顶部工具栏
│   ├── Sidebar.vue             # 左侧设备类型导航
│   └── MainContent.vue         # 右侧设备卡片内容
└── README.md                   # 说明文档
```

## 数据库表

基于 `biz_interface_info` 表，主要字段：
- `device_code`: 设备编号
- `device_name`: 设备名称
- `url`: API接口地址
- `agreement`: 通信协议
- `app_id`: 授权ID
- `app_key`: 授权密钥
- `device_type`: 设备类型（关联字典）
- `request_type`: 请求方式
- `params`: 请求参数
- `port`: 端口

## 使用方式

1. 访问路由：`/biz/interface-status`
2. 左侧选择设备类型，右侧显示对应设备列表
3. 支持搜索、刷新、连接测试等操作
4. 支持网格和列表两种视图模式

## 待完善功能

- [ ] 添加设备接口功能
- [ ] 设备详情页面
- [ ] 设备编辑功能
- [ ] 批量操作功能
- [ ] 设备状态实时更新
