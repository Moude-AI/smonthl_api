# Quick Publish Guide

快速发布 SmonthlAPI 到 npm 的步骤。

## 🚀 快速发布步骤

### 1. 登录 npm
```bash
npm login
# 输入用户名、密码和邮箱
```

### 2. 发布 HTML 版本
```bash
cd html-ver
npm publish --access public
```

### 3. 发布 React 版本
```bash
cd tsx-react-ver
npm run build:lib
npm publish --access public
```

## ✅ 完成！

用户现在可以安装：

```bash
# HTML 版本
npm install @smonthl/liquid-glass-html

# React 版本
npm install @smonthl/liquid-glass-react
```

## 📚 详细文档

查看 [NPM_PUBLISH.md](./NPM_PUBLISH.md) 获取完整发布指南。
