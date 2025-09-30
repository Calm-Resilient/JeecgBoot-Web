<template>
    <div class="example-container">
        <h2>HelpIcon 组件使用示例</h2>

        <!-- 基本用法 -->
        <div class="example-section">
            <h3>基本用法</h3>
            <p>这是一个简单的问号图标
                <HelpIcon tooltip-content="这是基本的提示信息" />
            </p>
        </div>

        <!-- 在标题中使用 -->
        <div class="example-section">
            <h3>在标题中使用</h3>
            <h4>用户管理
                <HelpIcon tooltip-content="管理系统中所有用户的信息" />
            </h4>
        </div>

        <!-- 在表单中使用 -->
        <div class="example-section">
            <h3>在表单中使用</h3>
            <div class="form-group">
                <label>用户名
                    <HelpIcon tooltip-content="请输入您的登录用户名，长度3-20个字符" />
                </label>
                <input type="text" placeholder="请输入用户名" />
            </div>
            <div class="form-group">
                <label>邮箱
                    <HelpIcon tooltip-content="请输入有效的邮箱地址，用于接收通知" />
                </label>
                <input type="email" placeholder="请输入邮箱" />
            </div>
        </div>

        <!-- 不同位置 -->
        <div class="example-section">
            <h3>不同位置的提示框</h3>
            <p>右侧提示
                <HelpIcon tooltip-content="这是右侧显示的提示" placement="right" />
            </p>
            <p>底部提示
                <HelpIcon tooltip-content="这是底部显示的提示" placement="bottom" />
            </p>
            <p>左侧提示
                <HelpIcon tooltip-content="这是左侧显示的提示" placement="left" />
            </p>
        </div>

        <!-- HTML格式提示 -->
        <div class="example-section">
            <h3>HTML格式提示</h3>
            <p>复杂说明
                <HelpIcon tooltip-content="<strong>重要提示：</strong><br/>这是第一行说明<br/>这是第二行说明<br/><em>注意事项</em>"
                    :max-width="250" />
            </p>
        </div>

        <!-- 按钮中使用 -->
        <div class="example-section">
            <h3>在按钮中使用</h3>
            <button class="btn">提交数据
                <HelpIcon tooltip-content="点击后将保存所有数据到服务器" />
            </button>
        </div>
    </div>
</template>

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

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
}

.form-group input {
    width: 200px;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
}

.btn {
    padding: 8px 16px;
    background: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
