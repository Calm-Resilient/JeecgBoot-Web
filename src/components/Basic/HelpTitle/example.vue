<template>
    <div class="example-container">
        <h2>HelpTitle 组件使用示例</h2>

        <!-- 基本用法 -->
        <div class="example-section">
            <h3>基本用法</h3>
            <HelpTitle title="基本信息" tooltip-content="这里填写用户的基本信息，包括姓名、年龄等" />
            <div class="form-content">
                <input type="text" placeholder="请输入姓名" />
            </div>
        </div>

        <!-- 多行提示 -->
        <div class="example-section">
            <h3>多行提示内容</h3>
            <HelpTitle title="复杂配置" :tooltip-content="complexTooltip" />
            <div class="form-content">
                <select>
                    <option>选项1</option>
                    <option>选项2</option>
                </select>
            </div>
        </div>

        <!-- 不同位置 -->
        <div class="example-section">
            <h3>不同位置的提示框</h3>
            <HelpTitle title="右侧提示" tooltip-content="这是右侧显示的提示信息" placement="right" />
            <HelpTitle title="底部提示" tooltip-content="这是底部显示的提示信息" placement="bottom" />
        </div>

        <!-- 自定义宽度 -->
        <div class="example-section">
            <h3>自定义宽度</h3>
            <HelpTitle title="长提示信息" tooltip-content="这是一个非常长的提示信息，需要更大的宽度来显示完整内容，避免文字被截断影响用户阅读体验" :max-width="500" />
        </div>
    </div>
</template>

<script setup>
const complexTooltip = [
    '这是多行提示的第一行',
    '这是第二行，包含重要说明',
    '这是第三行，提供操作建议'
];
</script>

<style scoped>
.example-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.example-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
}

.example-section h3 {
    color: #333;
    margin-bottom: 15px;
}

.form-content {
    margin-top: 15px;
}

.form-content input,
.form-content select {
    width: 200px;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
}
</style>
