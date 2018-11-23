## 打包流程

### 安卓

### 正式环境
build.gradle 修改新的版本号
MainApplication.java CODE_PUSH_KEY 更改为 CODEPUSH_KEY_PRODUCTIO
config.js API更改为正式
strings.xml 更改为正式名称： 正能量电子网
code-push 发布正式版
执行打包apk， 传入服务器

### 测试环境
build.gradle 修改新的版本号
MainApplication.java CODE_PUSH_KEY 更改为 CODEPUSH_KEY_STAGING
config.js API更改测试API
strings.xml 更改为正式名称： 正能量测试
code-push 发布STAGING版
执行打包apk， 传入服务器


### 更新

修改安卓代码或更新较大的时候使用服务器更新，其余使用热更新

APP每次启动会请求服务器， 对应版本号不一致时会提示用户下载更新，正式的会请求正式API（返回正式版本下载地址）， 测试版本会请求测试API（返回测试版本下载地址）


code-push热更新测试和正式对于APP的测试和正式版本