## 打包流程

### 安卓

#### 正式环境
build.gradle 修改新的版本号
MainApplication.java CODE_PUSH_KEY 更改为 CODEPUSH_KEY_PRODUCTIO
config.js API更改为正式
修改版本号记录 package.json
执行打包apk， 传入服务器

#### 测试环境
build.gradle 修改新的版本号
MainApplication.java CODE_PUSH_KEY 更改为 CODEPUSH_KEY_STAGING
config.js API更改测试API
修改版本号记录 package.json
执行打包apk， 传入服务器


code-push热更新测试和正式对于APP的测试和正式版本

### IOS
bug: 删除lib.react
clear
config.js
版本号
bundle-ios
Archive
upload
publish

- 注意
如果`node_modules`包重装后，将`react-native-wechat`包中的`DevelopmentTeam`改为`P3YTJX7552`

### 更新

APP每次启动会请求服务器， 对应版本号不一致时会提示用户下载更新，正式的会请求正式API（返回正式版本下载地址）， 测试版本会请求测试API（返回测试版本下载地址）

#### 热更新

code-push对应发布正式/测试版本

### 字体图标

- 下载最新字体，取出svg放入transfont目录
- 执行 `run cd ./transfont` && `./iconfont_mapper.sh iconfont.svg` 获取编码json， 替换 `src/components/Iconfont/iconfont.json`
- 替换 `ios/` 及 `android/app/src/main/assets/fonts/` 目录下的 `iconfont.ttf`文件
