/// <reference path="./@types/utils.d.ts"/>
const fs = require("fs")
const childProcess = require("child_process");
const { MessageEmbed } = require("discord.js");

const ojosamaCmdCheck = () =>{
    const res = childProcess.execFileSync("dist/ojosama", ["-v"]);
    return res.toString();
}

const ojosama = (text:string) =>{
    try{
        const res = childProcess.execFileSync("dist/ojosama", ["-t", text]);
        return res.toString();
    }catch(e){
        LOG(true, e);
        return false;
    }
};

const embedError = ({title, description}: {title:string, description?: string}) =>{
    const Embed = new MessageEmbed();
    Embed.setColor("#ff8989");
    Embed.setTitle(title);
    if(description) Embed.setDescription(description);
    return Embed
}

const embedNormal = ({title, description}: {title:string, description?: string}) =>{
    const Embed = new MessageEmbed();
    Embed.setColor("#c4ff89");
    Embed.setTitle(title);
    if(description) Embed.setDescription(description);
    return Embed
}

const saveWebhook = (token:WebhookToken) =>{
    try{
        fs.writeFileSync(`data/${token.channel}.json`, JSON.stringify(token));
        return true;
    }catch(e){
        return false;
    }
}

const LOG = (error:boolean, text:any) =>{
    const dh = new Date();
    const y = dh.getFullYear();
    const m = dh.getMonth()+1;
    const d = dh.getDate();
    const h = dh.getHours();
    const i = dh.getMinutes();
    const s = dh.getSeconds();
    const day = `${y}/${m}/${d}-${h}:${i}:${s}`;
    const type = error?"\x1b[31mERROR\x1b[0m":"LOG";
    console.log(`${day}|${type}|${text}`);
}

export {ojosama, ojosamaCmdCheck, embedError, embedNormal, saveWebhook, LOG}