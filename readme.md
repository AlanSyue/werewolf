## werewolf 狼人殺面殺小工具

### 預期功能
- 建立房間/選擇遊戲人員配置
- 以房間密碼快速加入房間
- 遊戲流程實作（天黑、天亮）
- 遊戲結束判斷（好人陣營、壞人陣營全滅）
- 遊戲技能啟動（預言家、女巫、騎士、獵人）

### 畫面線稿

![wireframe](./public/docs/wireframe.png)

### 技術使用
- vue、vue-router、vuex
- php、laravel 6.0
- pusher (websocket服務)
- mysql
- redis

## Install
1. 確定已安裝 npm、composer
2. 確定 redis 及 mysql 已經完成架設
3. 確定註冊 pusher 帳號及拿取到 key

## Get Start



```
npm install && npm run prod
composer install
cp .env.example .env
fill in mysql-connection-setting into .env
fill in pusher-setting into .env
```

### 如果有興趣協作開發，歡迎聯絡
- 信箱：b10303008@gmail.com