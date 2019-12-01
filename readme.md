## werewolf (狼人殺面殺小工具)

### Wireframe

![wireframe](./public/docs/wireframe.png)

### [Flow](https://drive.google.com/file/d/1PPYfuUqZHvPN8MbPxmKuEjYqoFRcVxcM/view?usp=sharing)
- 建立房間/選擇遊戲人員配置
- 以房間密碼快速加入房間
- 遊戲流程實作（天黑、天亮）
- 遊戲結束判斷（好人陣營、壞人陣營全滅）
- 遊戲技能啟動（預言家、女巫、騎士、獵人）


### Technologies Used
- vue2.6、vue-router3、vuex3
- php7、laravel 6.0
- pusher (websocket服務)
- mysql5.7
- redis

## Setup

This project uses the following tools. Go check them out if you don't have them locally installed.

- [node](https://nodejs.org/en/)
- [composer](https://getcomposer.org/)
- [redis](https://redis.io/)
- [mysql](https://www.mysql.com/)

Please register [pusher](https://pusher.com/), and create a [channel](https://pusher.com/channels) project

```
npm install && npm run prod
composer install
cp .env.example .env
# fill mysql-connection-setting into .env
# fill pusher-channel-setting into .env

php artisan key:generate
php artisan migrate
php artisan db:seed
```

## Usage

start web-service

```
php artisan serve
```

start redis-server

```
redis-server
```

start queue-runner

```
php artisan queue:work
```

## Contributing

PRs accepted.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author
- Email：b10303008@gmail.com


## License

```
The MIT License (MIT)

Copyright (c) 2019 Nick0603

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```