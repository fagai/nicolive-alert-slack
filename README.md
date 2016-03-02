# nicolive-alert-slack (ニコ生アラート for Slack)

ニコ生アラートのSlack通知版。
大体出来たので一旦UPしてます。

## Requirements

* Node.js v5.0 later

## Install

### Heroku Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

無料版で運用する場合は、Process Scheduler(6時間は休ませる必須)と外部から30分ごとにアクセスが必要です。

### Manual Install

#### clone repository

```
$ git clone https://github.com/fagai/nicolive-alert-slack.git
```

#### package install

```
$ cd nicolive-alert-slack
$ npm install
```

#### create and edit .env

```
$ cp .env.example .env
$ vi .env
```

#### Server Start

```
$ node server.js
```
