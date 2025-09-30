# HelpTitle 组件

一个带提示信息的标题组件，可以在标题右侧显示问号图标，鼠标悬停时显示提示信息。

## 功能特点

- 支持自定义标题文本
- 支持自定义提示内容
- 支持多种提示框位置
- 支持自定义提示框最大宽度
- 全局注册，可在任何地方使用

## 使用方法

### 基本用法

```vue
<template>
  <HelpTitle 
    title="标题文本"
    tooltip-content="这里是提示信息的内容"
  />
</template>
```

### 多行提示内容

```vue
<template>
  <HelpTitle 
    title="复杂功能"
    :tooltip-content="tooltipText"
  />
</template>

<script setup>
const tooltipText = [
  '这是第一行提示信息',
  '这是第二行提示信息',
  '这是第三行提示信息'
];
</script>
```

### 自定义位置和宽度

```vue
<template>
  <HelpTitle 
    title="自定义标题"
    tooltip-content="这是一个很长的提示信息，需要更大的宽度来显示"
    placement="bottom"
    :max-width="400"
  />
</template>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | string | - | 标题文本（必填） |
| tooltip-content | string \| string[] | - | 提示内容（必填） |
| placement | string | 'top' | 提示框位置 |
| max-width | number | 300 | 提示框最大宽度（px） |

## 支持的位置选项

- `top` - 上方
- `bottom` - 下方  
- `left` - 左侧
- `right` - 右侧
- `topLeft` - 上方左侧
- `topRight` - 上方右侧
- `bottomLeft` - 下方左侧
- `bottomRight` - 下方右侧
- `leftTop` - 左侧上方
- `leftBottom` - 左侧下方
- `rightTop` - 右侧上方
- `rightBottom` - 右侧下方

## 使用场景

1. 表单字段说明
2. 功能模块说明
3. 操作指导
4. 术语解释
5. 配置项说明

## 样式自定义

组件使用以下CSS类名，可以通过全局样式进行自定义：

- `.help-title-container` - 容器样式
- `.help-title-text` - 标题文本样式
- `.help-icon` - 问号图标样式

## 注意事项

1. 组件已全局注册，无需单独导入
2. 提示内容支持HTML标签（如 `<br/>`）
3. 建议提示内容不要过长，以免影响用户体验
4. 图标颜色会根据主题自动调整
