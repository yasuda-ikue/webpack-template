# 環境概要

ejs + sass + webpack の制作環境。

- [webpack 公式ドキュメント](https://webpack.js.org/)
- [webpack について説明サイト](https://ics.media/entry/12140/)
  <br><br><br><br>

# 使用方法

## 開発

```sh

# 初回セットアップ：モジュール類をインストール
yarn

＃ 実装を始める：webpackの立ち上げ ＆ 監視モード
yarn watch

```

<br>

## ビルド

```sh

＃ 開発環境用ファイル作成：dev環境に適した内容でビルドを行う
yarn build:dev

＃ 公開用ファイル作成：公開用に圧縮、不要ファイル削除を行う
yarn build

```

<br>

## .env

本環境では環境変数を使い、実装開発中、開発環境にアップ用、本番環境にアップ用など用途に分けて制作を行うことが可能です。
それらの環境変数を入れておくディレクトリが「.env」になります。
こちらは api キーなどセンシティブな内容を記載するため github 管理しません。
サンプルとして 「.env-sample」というディレクトリを用意してありますのでそちらを「.env」に書き換えるなどしてご利用ください。

**※github 管理していないのでテンプレを落としてきた直後に build などをしようとするとエラーになります。「.evn」をご用意ください。**

```sh

# 実装開発中　・・・　.env/development.js
yarn watchのコンマンド時に使用される変数

# 開発環境用　・・・　.env/stage.js
yarn build:devのコンマンド時に使用される変数

# 本番環境用　・・・　.env/production.js
yarn buildのコンマンド時に使用される変数

```

<br>

## キャッシュクリア

本環境では乱数を付与して css や js のキャッシュクリアを行うようにしております。
元となる ejs ファイルに「hash」という変数を持ち、

```java:title
<%
const crypto = require('crypto');
const hashNumb = crypto.randomBytes(8).toString('hex');
const self = {
  〜略〜
  hash: hashNumb
}
%>
```

キャッシュクリアした任意のファイルにその変数が付与するだけです。

```java
例）src/assets/include/common/_head.ejs
<link  rel="stylesheet"  href="<%- self.root %>assets/css/style.css?<%- self.hash %>">

例）src/assets/include/common/scripts/_scripts-Global.ejs
<script  src="<%- self.root %>assets/js/global-bundle.js?<%- self.hash %>"></script>
```

ビルドごとに変数が付与されます。
<br><br>

## ローカルホスト

本環境ローカルホストのドメインを指定できます。
API 叩くにあたってドメインを localhost から変えたい時などに指定してください。
指定する場合は webpack.config.js の該当箇所に追記ください。

```java:webpack.config.js
module.exports = {
  mode: modeType,
  devServer: {
    host: 'hoge.local.nicovideo.jp', //←←←コレ
    hot: true,
    open: true,
    port: 8080,
    server: 'https',
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: [path.resolve(__dirname, './src/**/*')],
  },
  〜略〜
};
```

**※こちらの設定以外にご利用の PC の private/etc/hosts を適宜変更してください**
