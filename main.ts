import { ojosamaCmdCheck, ojosama, embedError, embedNormal, saveWebhook, LOG } from "./utils";

const {Client, Intents, WebhookClient} = require("discord.js");
const fs = require("fs");
const { exit } = require("process");
const { config } = require("./config");

LOG(false, "Bot starting");
const client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});

client.on("ready", async () =>{
    try{
        ojosamaCmdCheck();
    }catch(e){
        LOG(true, `ojosama command not found / ${e}`);
        exit(0);
        return;
    }
    LOG(false, `Connected to DiscordAPI(${client.ws.gateway}) as ${client.user.tag}`);
    const commands = [
        {
            name: "ojosama-chat",
            description: "このチャンネルでのojosamaチャットの有効/無効を設定します",
            options: [
                {
                    type: "INTEGER",
                    name: "type",
                    description: "有効または無効を設定",
                    required: true,
                    choices: [
                        {name: "有効化", value: 1},
                        {name: "無効化", value: 0}
                    ]
                }
            ]
        },
        {
            name: "help",
            description: "このBotのヘルプと情報を表示します"
        }
    ]
    await client.application.commands.set(commands, config?.DEBUG);
    LOG(false, `Complete command settings`);
    if(config?.DEBUG) LOG(false, `Debug Mode (Server ID: ${config?.DEBUG})`);
});

client.on("interactionCreate", async (interaction:any) =>{
    if(!interaction.isCommand()) return;
    if(interaction.commandName === "ojosama-chat"){
        if(interaction.options.getInteger("type") === 1){
            if(fs.existsSync(`data/${interaction.channel.id}.json`)) return interaction.reply({
                embeds: [embedError({title: "既に有効化済みです"})]
            });
            if(!interaction.channel.permissionsFor(interaction.guild.me).has("MANAGE_WEBHOOKS")) return interaction.reply({
                embeds: [embedError({title: "権限エラー", description: "このBotにWebhookの作成権限がありません"})]
            });
    
            const request = await interaction.channel.createWebhook("ojosamaチャット")
            .catch((e:unknown) =>{
                interaction.reply({
                    embeds: [embedError({title: "Webhookの作成に失敗しました"})]
                });
                return 0;
            });
            if(!request) return;
            const wdata:WebhookToken = {
                id: request.id,
                token: request.token,
                channel: interaction.channel.id
            }
            saveWebhook(wdata);
            (new WebhookClient({
                id: request.id,
                token: request.token
            })).send("セットアップが完了しました");
            interaction.reply({
                embeds: [embedNormal({title: "有効化しました"})]
            });
            const enabled_server = fs.readdirSync("data/").length;
            LOG(false, `Chat enabled (${enabled_server-1} Chat)`);
            return;
        }else if(interaction.options.getInteger("type") === 0){
            if(!fs.existsSync(`data/${interaction.channel.id}.json`)) return interaction.reply({
                embeds: [embedError({title: "設定を確認できませんでした"})]
            });
            try{
                const webhooks = await interaction.channel.fetchWebhooks();
                const webhook = webhooks.find((wh:any) => wh.token);
                await webhook.delete();
            }catch(e){
                return interaction.reply({
                    embeds: [embedError({title: "Webhookの設定を消去できませんでした"})]
                });
            }
            try{
                fs.unlinkSync(`data/${interaction.channel.id}.json`);
            }catch(e:unknown){
                LOG(true, `Chat invalidation failed [UNLINK]/${e}`);
                return interaction.reply({
                    embeds: [embedError({title: "無効化に失敗しました[FS]"})]
                });
            }
            interaction.reply("無効化しました");
        }
    }else if(interaction.commandName === "help"){
        const enabled_server = fs.readdirSync("data/").length;
        interaction.reply({
            embeds: [embedNormal({
                title: "ojosamaチャット HELP",
                description: "``` /ojosama-chat ``` でチャットの有効/無効を設定できます"
            }).addField("INFO", `\`${enabled_server-1}\`チャンネルで有効化されています`)
            .addField("About", "[jiro4989/ojosama](https://github.com/jiro4989/ojosama)を使用させていただいています\nお心より感謝いたしますわ")]
        })
    }
})

client.on("messageCreate", async (message:any) =>{
    // Ignore Bot
    if(message.author.bot) return;

    // Check Webhook
    if(!fs.existsSync(`data/${message.channel.id}.json`)) return;
    const WebhookConfig: { id:string, token:string, channel:string} = JSON.parse(fs.readFileSync(`data/${message.channel.id}.json`));
    const channelWebhooks = await message.channel.fetchWebhooks();
    if(!channelWebhooks.some((v:object, k:string) => WebhookConfig.id === k)){
        try{
            fs.unlinkSync(`data/${message.channel.id}.json`);
            return;
        }catch(e:unknown){
            LOG(true, `Not found Webhook [UNLINK]/${e}`);
        }
    }
    
    // Convert
    if(message.content == undefined) return;

    // Message Delete
    await message.delete();
    const ojosamaResult:string = ojosama(message.content);
    if(!ojosamaResult) return message.channel.send({
        embeds: [embedError({title: "変換に失敗しました"})]
    });
    
    // Send Webhook
    const webhookh = new WebhookClient({id: WebhookConfig.id, token: WebhookConfig.token})
    webhookh.send({
        content: ojosamaResult,
        username: message.author.username,
        avatarURL: message.author.avatarURL()
    }).catch((e:any) =>{
        LOG(true, `Webhook send error/${e}`);
    })
    
    return;
});

client.login(config.DISCORD_API_TOKEN);