# nicolive-alert-slack (ニコ生アラート for Slack)

ニコ生アラートのSlack通知版。
大体出来たので一旦UPしてます。

## Requirements

* Node.js v5.0 later

## Install

### Heroku Deploy

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

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

#### create .env

```
$ cp .env.example .env
$ vi .env
```

#### Server Start

```
$ node server.js
```
