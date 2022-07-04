# ojosama-discord-channel

このBotは指定したチャンネルでの発言をすべて壱百満天原サロメお嬢様風の口調に変換します

[Video](https://user-images.githubusercontent.com/67790884/177174402-cc30d9ae-2b7a-49f8-b55b-4d4f600b282e.mp4)

## Use

[このBotを招待する](https://discord.com/api/oauth2/authorize?client_id=990955234840965180&permissions=2684382288&scope=bot%20applications.commands)

`/help`でBotの使い方が表示されます

## Run

- `Docker v20.10.17`

での動作を確認しています

### 1.リポジトリのクローン

```bash
git clone https://github.com/Ablaze-MIRAI/ojosama-discord-channel.git
cd ojosama-discord-channel
```

### 2.設定の記述

`config.ts`をサンプルファイルから作成します

```bash
# Linux
cp config.sample.ts config.ts

# Windows
copy config.sample.ts config.ts
```

[Discord Developer Portal](https://discord.com/developers/applications/)からDiscordAPIのBot用トークンを取得してください

```js
// config.ts
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

### 3.コンテナの起動

```bash
docker compose up

# バックグラウンドで実行
docker compose up -d
```

## License

**にじさんじ所属の壱百満天原サロメさん及びにじさんじ関係者、ファンコミュニティの迷惑にならないように使用をお願いします。**

変換には[jiro4989/ojosama-web](https://github.com/jiro4989/ojosama-web)を使用しています。ありがとうございます。

壱百満天原サロメさんを題材にした二次創作作品ですので[ANYCOLOR二次創作ガイドライン](https://event.nijisanji.app/guidelines/)に従います
