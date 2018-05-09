> VCG 专题管理系统

### 项目目录结构

```
.
├── /build/                     # 打包输入目标
├── /docs/                      # 项目文档&资料
├── /node_modules/              # 模块包
├── /public/                    # 静态资源文件
├── /src/                       # 源文件
│   ├── /components/            # 公共组件
│   ├── /data/                  # 模拟假数据
│   ├── /routes/                # 页面组件
│   ├── /client.js              # 客户端启动脚本
│   ├── /config.js              # 全局配置文件
│   ├── /server.js              # 服务器启动脚本
│   └── ...                     # 其它工具
├── /test/                      # 单元测试
├── /tools/                     # 构建自动脚本
│   ├── /lib/                   #
│   ├── /build.js               #
│   ├── /bundle.js              #
│   ├── /clean.js               #
│   ├── /copy.js                #
│   ├── /deploy.js              #
│   ├── /postcss.config.js      #
│   ├── /run.js                 #
│   ├── /runServer.js           #
│   ├── /start.js               #
│   └── /webpack.config.js      #
├── Dockerfile                  # 生产环境Docker映像的命令
├── package.json                # npm配置文件
└── yarn.lock                   # yarn 依赖包详情文件
```

### 一、开发

安装依赖模块包

```
yarn install
```

启动项目

```
yarn start
```

### 二、部署

打包

```
yarn build
```

提交到 gitlab

```
git add .
git commit -m 部署
git push
```

构建项目

```
...
```
