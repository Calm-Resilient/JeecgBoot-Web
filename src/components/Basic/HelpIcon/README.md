# HelpIcon 组件

一个简单的问号图标组件，可以在任何地方使用，鼠标悬停时显示提示信息。

## 功能特点

- 轻量级设计，只包含问号图标
- 支持自定义提示内容
- 支持多种提示框位置
- 支持自定义提示框最大宽度
- 全局注册，可在任何地方使用
- 支持HTML格式的提示内容

## 使用方法

### 基本用法

```vue
<template>
  <div>
    <h3>标题文本 <HelpIcon tooltip-content="这里是提示信息" /></h3>
  </div>
</template>
```

### 在表单标签中使用

```vue
<template>
  <div class="form-group">
    <label>字段名称 <HelpIcon tooltip-content="请填写真实的字段信息" /></label>
    <input type="text" />
  </div>
</template>
```

### 自定义位置和宽度

```vue
<template>
  <div>
    <span>复杂功能 <HelpIcon 
      tooltip-content="这是一个很长的提示信息，需要更大的宽度来显示"
      placement="bottom"
      :max-width="400"
    /></span>
  </div>
</template>
```

### 支持HTML格式

```vue
<template>
  <div>
    <h3>功能说明 
      <HelpIcon 
        tooltip-content="<strong>重要提示：</strong><br/>这是第一行说明<br/>这是第二行说明"
      />
    </h3>
  </div>
</template>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| tooltip-content | string | - | 提示内容（必填） |
| placement | string | 'top' | 提示框位置 |
| max-width | number | 300 | 提示框最大宽度（px） |

## 支持的位置选项

- `top` - 上方（默认）
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

1. **表单字段说明**
   ```vue
   <label>用户名 <HelpIcon tooltip-content="请输入您的登录用户名" /></label>
   ```

2. **按钮说明**
   ```vue
   <button>提交 <HelpIcon tooltip-content="点击提交后数据将保存到服务器" /></button>
   ```

3. **菜单项说明**
   ```vue
   <span>高级设置 <HelpIcon tooltip-content="包含系统高级配置选项" /></span>
   ```

4. **状态说明**
   ```vue
   <span>在线 <HelpIcon tooltip-content="用户当前在线状态" /></span>
   ```

## 样式自定义

组件使用以下CSS类名，可以通过全局样式进行自定义：

- `.help-icon` - 问号图标样式

## 注意事项

1. 组件已全局注册，无需单独导入
2. 图标会自动添加左边距（4px）
3. 提示内容支持HTML标签
4. 图标颜色会根据悬停状态自动变化
5. 建议提示内容不要过长，以免影响用户体验
