# Form Create TypeScript Demo

完全使用 TypeScript + Vite + Mock 的 form-create 示例项目。

## 特性

- ✅ TypeScript 类型安全
- ✅ Vite 构建工具
- ✅ Element Plus UI 组件库
- ✅ Mock API 模拟后端数据
- ✅ 完全通过 JSON 配置驱动 UI

## 安装依赖

```bash
npm install
# 或
pnpm install
```

## 运行开发服务器

```bash
npm run dev
# 或
pnpm dev
```

访问 http://localhost:3000

## 构建生产版本

```bash
npm run build
# 或
pnpm build
```

## 项目结构

```
├── src/
│   ├── api/              # API 请求
│   │   └── index.ts
│   ├── mock/             # Mock 数据
│   │   ├── api.ts
│   │   └── pageRule.json # 页面配置 JSON
│   ├── types/            # TypeScript 类型定义
│   │   └── index.ts
│   ├── App.vue           # 主组件
│   ├── main.ts           # 入口文件
│   └── style.css         # 全局样式
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 核心概念

整个页面完全由 `src/mock/pageRule.json` 中的 JSON 配置驱动，通过 Mock API 下发，实现完全的配置化 UI。
