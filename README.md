# ojosama-discord-channel

このBotは指定したチャンネルでの発言をすべて壱百満天原サロメお嬢様風の口調に変換します

## Use

[このBotを招待する(coming soon)](https://dicord.gg/xxxx)

`/help`でBotの使い方が表示されます

## Run

### 1.リポジトリのクローン

```bash
git clone https://github.com/Ablaze-MIRAI/ojosama-discord-channel.git
cd ojosama-discord-channel
```

### 2.設定の記述

`config.ts`をサンプルファイルから作成にします

```bash
# Linux
cp config.sample.ts config.ts

# Windows
copy config.sample.ts config.ts
```

DiscordAPIのBot用トークンを取得してください

```js
module.exports.config = {
    // Discord API Token
    DISCORD_API_TOKEN: "[DISCORD BOT TOKEN]",

    // Debug
    // Debug discord server's ID
    // Default: undefined
    DEBUG: "00000000000000000"

    // サーバIDを記述する事でそのサーバでのスラッシュコマンドのデバックを有効にします
}
```

### 3.依存パッケージのインストールとビルド

```bash
# 依存パッケージをインストールしTypeScriptをビルド
yarn install
yarn build

# 依存しているソフトウェアをダウンロード
cd dist && git clone https://github.com/jiro4989/ojosama

# Windows
cd ojosama/cmd/ojosama && go build -o ../../../ojosama.exe . && cd ../../../../

# Linux 
cd ojosama/cmd/ojosama && go build -o ../../../ojosama *.go && cd ../../../../
```

### 4.実行

```bash
node build/main.js
```

## License

にじさんじ所属の壱百満天原サロメさん及びにじさんじ関係者、ファンコミュニティの迷惑にならないように使用をお願いします。

壱百満天原サロメさんのキャラクターを題材にした二次創作作品ですので[ANYCOLOR二次創作ガイドライン](https://event.nijisanji.app/guidelines/)に従います
